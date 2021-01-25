import { TagCloud } from 'react-tagcloud'
import { getWordCloudTags } from "../api";
 import "./WordCloud.css";
 import React, {useState, useEffect} from 'react'

export default function WordCloud({ pageId, onClickTag }) {
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setError(null);
        setTags(null);
        setLoading(true);
        const tags = await getWordCloudTags(pageId)
        setTags(tags);
      } catch (e) {
        setError(e);
        console.error(e)
      }
      setLoading(false);
    };

    fetchTags();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  if (!tags) return null;

  return (
    <div className="container">
      <div className="word-cloud">
        <TagCloud minSize={12} maxSize={35} tags={tags} onClick={onClickTag} />
      </div>
    </div>
  );
}