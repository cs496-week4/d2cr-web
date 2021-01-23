import React, { useEffect, useReducer, useState } from "react";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import ReviewList from "./ReviewList";
import RateFilter from "./RateFilter";
import Sorter from "./Sorter";
import "./ReviewMoa.css";
import { getReviews } from "../../api";
import { getRequestData } from "../../util/format";
import { reviewReducer as reducer } from "../../util/reviews";
import { reviewInitialState as initialState } from "../../util/reviews";
import { reviewActions as actions } from "../../util/reviews";

// 한번에 로드할 리뷰 수
const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

export default function ReviewMoa() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { reviews, searchKeyword, rateFilter, sorter, sorterDir, offset } = state;

  const [reloading, setReloading] = useState(true);

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
				const path = window.location.pathname;
				const newReviews = await getReviews(path, requestData, offset);
				dispatch(actions.LOAD_MORE_REVIEWS(newReviews));
			}
			fetchReviews();
		}
  }, [offset]);

  useEffect(() => {
    if (reloading === true) {
			console.log("쿼리가 바뀌어서 새로운 데이터를 불러옵니다!");

      async function fetchReviews() {
        const requestData = getCurrentRequestData();
        const path = window.location.pathname;
        const newReviews = await getReviews(path, requestData, offset);
        dispatch(actions.INIT_REVIEWS(newReviews));
        setReloading(false);
        setOffset(0);
      }
      fetchReviews();
    }
  }, [reloading]);

  // 쿼리가 바뀌었을 때 처음 15개 데이터만 로드
  useEffect(() => {
    setReloading(true);
    console.log("쿼리가 바뀜");
  }, [searchKeyword, rateFilter, sorter, sorterDir]);

  const onSearchChange = (_searchKeyword) => {
    dispatch(actions.SET_SEARCH(_searchKeyword));
  };

  const onRateFilterChange = (_rate) => {
    dispatch(actions.SET_RATE_FILTER(getRateFilter(_rate)));
  };

  const getRateFilter = (_rate) => {
    if (rateFilter.includes(_rate)) return rateFilter.filter((item) => item !== _rate);
    else return [...rateFilter, _rate];
  };

  const onSorterChange = (_sorter) => {
    dispatch(actions.SET_SORTER(_sorter));
  };

  const onSorterDirChange = (_sorterDir) => {
    dispatch(actions.SET_SORTER_DIR(_sorterDir));
  };

  const setOffset = (_offset) => {
    dispatch(actions.SET_OFFSET(_offset));
  };

  return (
    <div className="review-app">
      <AppHeader reviewCount={reviews.length} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <RateFilter rateFilter={rateFilter} onRateFilterChange={onRateFilterChange} />
        <Sorter sorter={sorter} onSorterChange={onSorterChange} onSorterDirChange={onSorterDirChange} sorterDir={sorterDir} />
      </div>
      <ReviewList reviews={reviews} />
    </div>
  );
}
