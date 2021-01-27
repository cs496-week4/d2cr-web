import React, { useState, useEffect } from "react";
import Title from "../Title";
import ReactWordcloud from "react-wordcloud";
import { getWordCloudTags } from "../api";

const options = {
  colors: ["black"],
  fontSizes: [18, 36],
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
