import React, { useEffect, useReducer, useState } from "react";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import ReviewItem from "./ReviewItem";
import RateFilter from "./RateFilter";
import Sorter from "./Sorter";
import "./ReviewMoa.css";
import { getPage } from "../../api";
import { getRequestData } from "../../util/format";
import { sorterDirState, sorterState, rateFilterState } from "../../util/states";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

// 한번에 로드할 리뷰 수
const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 500,
  },

  container: {
    margin: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 200,
    flexDirection: "column",
    margin: 5,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ReviewMoa({ pageId, searchKeyword, onSearchChange, keyword, onInit }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [rateFilter, setRateFilter] = useState(rateFilterState.all);
  const [sorter, setSorter] = useState(sorterState.none);
  const [sorterDir, setSorterDir] = useState(sorterDirState.none);
  const [offset, setOffset] = useState(0);

  const [reloading, setReloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reviewCount, setReviewCount] = useState(0);

  const initFilterSorter = () => {
    setRateFilter(rateFilterState.all);
    setSorter(sorterState.none);
    setSorterDir(sorterDirState.none);
    onSearchChange("");
  };

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setOffset(offset + loadNum);
        console.log("데이터를 더 불러오는 중...");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const getCurrentRequestData = () => getRequestData(searchKeyword, rateFilter, sorter, sorterDir);

  useEffect(() => {
    if (offset !== 0) {
      console.log("스크롤의 끝에 도달해서 새로운 데이터를 불러옵니다!");

      async function fetchReviews() {
        const requestData = getCurrentRequestData();
        const pageData = await getPage(pageId, requestData, offset);
        const newReviews = pageData.reviews;
        loadMoreReviews(newReviews);
      }
      fetchReviews();
    }
  }, [offset]);

  useEffect(() => {
    if (reloading === true) {
      console.log("쿼리가 바뀌어서 새로운 데이터를 불러옵니다!");

      // TODO 로딩 중 처리

      const fetchReviews = async () => {
        try {
          setError(null);
          setLoading(true);
          const requestData = getCurrentRequestData();
          const pageData = await getPage(pageId, requestData, 0);
          const newReviews = pageData.reviews;
          setReviewCount(pageData.reviewCount);
          initReviews(newReviews);
          setReloading(false);
          setOffset(0);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchReviews();
    }
  }, [reloading]);

  // 쿼리가 바뀌었을 때 처음 15개 데이터만 로드
  useEffect(() => {
    setReloading(true);
    console.log("쿼리가 바뀜");
  }, [searchKeyword, rateFilter, sorter, sorterDir]);

  const loadMoreReviews = (newReviews) => {
    setReviews((reviews) => [...reviews, ...newReviews]);
  };

  const initReviews = (newReviews) => {
    setReviews(newReviews);
  };

  const onRateFilterChange = (_rate) => {
    setRateFilter(getRateFilter(_rate));
    console.log(rateFilter);
  };

  const getRateFilter = (_rate) => {
    if (rateFilter.includes(_rate)) return rateFilter.filter((item) => item !== _rate);
    else return [...rateFilter, _rate];
  };

  const onSorterChange = (_sorter) => {
    console.log("sorter: " + _sorter);
    setSorter(_sorter);
  };

  const onSorterDirChange = (_sorterDir) => {
    console.log("_sorterDir: " + _sorterDir);

    setSorterDir(_sorterDir);
  };

  const getReviewList = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    const elements = reviews.map((item, id) => {
      return <ReviewItem item={item} key={item._id} />;
    });

    return <Container className={classes.container}>{elements}</Container>;
  };

  return (
    <Container className={classes.root}> 
      <div>reviewCount: {reviewCount}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <RateFilter rateFilter={rateFilter} onRateFilterChange={onRateFilterChange} />
        </div>
        <div style={{ flex: 1 }}>
          <Sorter sorter={sorter} onSorterChange={onSorterChange} onSorterDirChange={onSorterDirChange} sorterDir={sorterDir} onInit={initFilterSorter} />
          <AwesomeButton onPress={initFilterSorter}> 초기화 </AwesomeButton>
          <SearchPanel onSearchChange={onSearchChange} keyword={keyword} />
        </div>
      </div>
      {getReviewList()}
    </Container>
  );
}
