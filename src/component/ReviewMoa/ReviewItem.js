import React from "react";
import "./ReviewMoa.css";
import "./ReviewList.css";

export default function ReviewItem({content, rate, date, user}) {

  return (
    <div className="comment">
      <div className="user-text">
        <p>{date}</p>
        <span>{user}</span>
      </div>
      <div>
        <span className="review-list-item-content">{content}</span>
        <span className="review-list-item-content">{rate}</span>
      </div>
    </div>
  );
}
