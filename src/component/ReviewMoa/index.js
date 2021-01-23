import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "../AppHeader";
import SearchPanel from "./SearchPanel";
import ReviewList from "./ReviewList";
import Filter from "./Filter";
import Sorter from "./Sorter";
import { filterState, sorterState, sorterDirState } from "../../util/states";
import axios from "axios";

// filter, term 모두 server에 전달해서 해당 데이터 받아옴
export default function ReviewMoa() {
  const [reviews, setReviews] = useState([]);
  const [term, setTerm] = useState("");

  const [filter, setFilter] = useState(filterState.all);
  
  const [sorter, setSorter] = useState(sorterState.star);
  const [sorterDir, setSorterDir] = useState(sorterDirState.low);

  useEffect(() => {
    console.log("term: ", term)
    console.log("filter: ", filter)
    console.log("sorter: ", sorter)
    console.log("sorterDir: ", sorterDir)

    const newReviews = []
    // const newReviews = API.getReviews(term, filter, sorter, sorterDir);
    // axios.get("/web/{현재 주소}", )
    // TODO 현재 route 콘솔에 찍기
    setReviews(newReviews);
  }, [term, filter, sorter, sorterDir]);

  const onSearchChange = (term) => {
    setTerm(term);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
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
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <Sorter {...sorter, sorterDir, onSorterChange, onSorterDirChange}/>
      </div>
      <ReviewList reviews={reviews} />
    </div>
  );
}
