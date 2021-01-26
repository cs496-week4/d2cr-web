import React, { useEffect, useState } from "react";
import ReviewMoa from "./ReviewMoa";
import WordCloud from "./WordCloud";
import "./App.css";
import { removeFirstSlash } from "../util/format";
import MonthlyRate from "./MonthlyRate/MonthlyRate";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "../dashboard/Dashboard";

// 한번에 로드할 리뷰 수

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
    display: "flex",
    padding: "50",
  },
  analysis: {
    flex: 1,
  },

  reviews: {
    flex: 1,
    width: "100%",
    minWidth: 600,
  },
}));

export default function App() {
  // const classes = useStyles();

  // const pageId = removeFirstSlash(window.location.pathname);
  // const [searchKeyword, setSearchKeyword] = useState("");

  // const onClickTag = (tag) => {
  //   setSearchKeyword(tag.value);
  // };

  // const onSearchChange = (keyword) => {
  //   setSearchKeyword(keyword);
  // };

  // return (
  //   <Container className={classes.root}>
  //       <ReviewMoa pageId={pageId} searchKeyword={searchKeyword} onSearchChange={onSearchChange} keyword={searchKeyword} />

  //     <Container className={classes.analysis}>
  //       <WordCloud pageId={pageId} onClickTag={onClickTag} />
  //       <MonthlyRate pageId={pageId} />
  //     </Container>
  //   </Container>
  // );
  return <Dashboard/>
}
