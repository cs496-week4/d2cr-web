import React, { useEffect, useState } from "react";
import ReviewMoa from "./ReviewMoa";
import WordCloud from "./WordCloud";
import "./App.css";
import { removeFirstSlash } from "../util/format";
import MonthlyRate from "./MonthlyRate/MonthlyRate";

export default function App() {
  const pageId = removeFirstSlash(window.location.pathname);
  // const [pageId, setPageId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");


  const onClickTag = (tag) => {
    setSearchKeyword(tag.value);
  }

  const onSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  }

  return (
    <div className="content">
      <div className="reviews">
        <ReviewMoa pageId={pageId} searchKeyword={searchKeyword} onSearchChange={onSearchChange} />
      </div>

      <div className="analysis">
        <WordCloud pageId={pageId} onClickTag={onClickTag} />
        <MonthlyRate pageId={pageId} />
      </div>
    </div>
  );
}
