import React from "react";
import ReviewMoa from "./ReviewMoa";
import WordCloud from "./WordCloud";
import "./App.css";

export default function App() {
  return (
    <div className="content">
      <ReviewMoa/>
      <WordCloud/>
    </div>
  );
}