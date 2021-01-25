import React, { useEffect, useState } from "react";
import ReviewMoa from "./ReviewMoa";
import WordCloud from "./WordCloud";
import "./App.css";
import { removeFirstSlash } from "../util/format";

export default function App() {
  const [pageId, setPageId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setPageId(removeFirstSlash(path)); // remove last '/'
  }, [])

  const onClickTag = (tag) => {
    setSearchKeyword(tag);
  }

  const onSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  }

  return (
    <div className="content">
      <ReviewMoa pageId={pageId} searchKeyword={searchKeyword} onSearchChange={onSearchChange}/>
      <WordCloud pageId={pageId} onClickTag={onClickTag}/>
    </div>
  );
}
