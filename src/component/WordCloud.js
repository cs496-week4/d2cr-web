import React, { useState, useEffect } from "react";
import Title from "./Title";
import ReactWordcloud from "react-wordcloud";
import { getWordCloudTags } from "../api";
import "./App.css"

const options = {
  colors: ["#FFB997", "#AFCAD7", "#3CAEA3", "#F6D55C", "#ED553B"],
  fontSizes: [18, 36],
  rotationAngles: [-30, 0, 30],
  rotations: 2,
  fontFamily: "GmarketSansTTFLight",
};

export default function WordCloud({ pageId, onClickTag }) {
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getComponent = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!tags) return null;
    return <ReactWordcloud words={tags} options={options} />;
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setError(null);
        setTags(null);
        setLoading(true);
        const tags = await getWordCloudTags(pageId);
        setTags(tags);
      } catch (e) {
        setError(e);
        console.error(e);
      }
      setLoading(false);
    };

    fetchTags();
  }, []);

  return (
    <React.Fragment>
      <Title>단어 분석</Title>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{getComponent()}</div>
    </React.Fragment>
  );
}
