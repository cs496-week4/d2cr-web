import React from "react";
import "./ReviewMoa.css";


export default function ReviewItem({content, point, date}) {

  return (
    <span className="review-list-item">
      <span className="review-list-item-content">{content}</span>
      <span className="review-list-item-content">{point}</span>
      <span className="review-list-item-content">{date}</span>
    </span>
  );
}
