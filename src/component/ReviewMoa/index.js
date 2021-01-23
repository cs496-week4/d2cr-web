import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import ReviewList from "./ReviewList";
import RateFilter from "./RateFilter";
import Sorter from "./Sorter";
import { rateFilterState, sorterState, sorterDirState } from "../../util/states";
import "./ReviewMoa.css";
import {getReviews} from "../../api"
import { getRequestData } from "../../util/format";

// rateFilter, term 모두 server에 전달해서 해당 데s이터 받아옴
export default function ReviewMoa() {
  const [reviews, setReviews] = useState([]);
  const [term, setTerm] = useState("");
  const [rateFilter, setRateFilter] = useState(rateFilterState.all);
  const [sorter, setSorter] = useState(sorterState.star);
  const [sorterDir, setSorterDir] = useState(sorterDirState.low);

  useEffect(() => {
    async function fetchReviews() {
        const requestData = getRequestData(term, rateFilter, sorter, sorterDir);
        const path = window.location.pathname;
        const newReviews = await getReviews(path, requestData);
        setReviews(newReviews);
    }

    fetchReviews()
  }, [term, rateFilter, sorter, sorterDir]);

  const onSearchChange = (term) => {
    setTerm(term);
  };

  const onRateFilterChange = (rate) => {
    if (rateFilter.includes(rate)) setRateFilter(rateFilter.filter((item) => item !== rate));
    else setRateFilter([...rateFilter, rate]);
  };

  const onSorterChange = (sorter) => {
    setSorter(sorter);
  };

  const onSorterDirChange = (sorterDir) => {
    setSorterDir(sorterDir);
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
