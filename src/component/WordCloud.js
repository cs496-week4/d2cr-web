import { TagCloud } from 'react-tagcloud'
import { getWordCloudTags } from "../api";
 import "./WordCloud.css";
 import React, {useState, useEffect} from 'react'

// const data = [
//   { value: 'JavaScript', count: 38 },
//   { value: 'React', count: 30 },
//   { value: 'Nodejs', count: 28 },
//   { value: 'Express.js', count: 25 },
//   { value: 'HTML5', count: 33 },
//   { value: 'MongoDB', count: 18 },
//   { value: 'CSS3', count: 20 },
// ]
 
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
    <div className="word-cloud">
      <TagCloud minSize={12} maxSize={35} tags={tags} onClick={onClickTag} />
    </div>
  );
}