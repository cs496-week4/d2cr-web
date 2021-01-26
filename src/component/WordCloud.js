import { TagCloud } from "react-tagcloud";
import { getWordCloudTags } from "../api";
import "./WordCloud.css";
import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    margin: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 200,
    minWidth: 400,
    margin: 5,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function WordCloud({ pageId, onClickTag }) {
  const classes = useStyles();

  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const getComponent = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!tags) return null;
    return <TagCloud minSize={12} maxSize={35} tags={tags} onClick={onClickTag} />;
  };

  return (
    <Card className={classes.container}>{getComponent()}</Card>
  );
}
