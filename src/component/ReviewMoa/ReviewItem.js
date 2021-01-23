import React from "react";
import "./ReviewMoa.css";

export default function ReviewItem({content, rate, date}) {

  return (
    <span className="review-list-item">
      <span className="review-list-item-content">{content}</span>
      <span className="review-list-item-content">{rate}</span>
      <span className="review-list-item-content">{date}</span>
    </span>
  );
}
