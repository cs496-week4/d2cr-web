import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import ReactWordcloud from "react-wordcloud";


const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
];
 
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function WordCloud() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>단어 분석</Title>
      <ReactWordcloud words={words} />
    </React.Fragment>
  );
}
