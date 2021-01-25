import React, { useEffect, useReducer, useState } from "react";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import ReviewList from "./ReviewList";
import RateFilter from "./RateFilter";
import Sorter from "./Sorter";
import "./ReviewMoa.css";
import { getReviews } from "../../api";
import { getRequestData } from "../../util/format";
import { sorterDirState, sorterState, rateFilterState } from "../../util/states";

// 한번에 로드할 리뷰 수
const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

export default function ReviewMoa({ pageId, searchKeyword, onSearchChange }) {
  const [reviews, setReviews] = useState([]);
  const [rateFilter, setRateFilter] = useState(rateFilterState.all);
  const [sorter, setSorter] = useState(sorterState.date);
  const [sorterDir, setSorterDir] = useState(sorterDirState.low);
  const [offset, setOffset] = useState(0);

  const [reloading, setReloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reviewCount, setReviewCount] = useState(0)

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
        const newReviews = await getReviews(pageId, requestData, offset);
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
          const path = window.location.pathname;
          const newReviews = await getReviews(path, requestData, 0);
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
  };

  const getRateFilter = (_rate) => {
    if (rateFilter.includes(_rate)) return rateFilter.filter((item) => item !== _rate);
    else return [...rateFilter, _rate];
  };

  const onSorterChange = (_sorter) => {
    setSorter(_sorter);
  };

  const onSorterDirChange = (_sorterDir) => {
    setSorterDir(_sorterDir);
  };

  const getReviewList = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    return <ReviewList reviews={reviews} />;
  }

  return (
    <div className="review-app">
      <AppHeader reviewCount={reviewCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <RateFilter rateFilter={rateFilter} onRateFilterChange={onRateFilterChange} />
        <Sorter sorter={sorter} onSorterChange={onSorterChange} onSorterDirChange={onSorterDirChange} sorterDir={sorterDir} />
      </div>
      {getReviewList()}
    </div>
  );
}
