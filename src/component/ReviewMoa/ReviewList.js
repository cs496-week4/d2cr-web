import ReviewItem from "./ReviewItem";
import "./ReviewMoa.css";
import React from "react";

export default function ReviewList({reviews}) {
  const elements = reviews.map(item => {
    return (
      <li className="list-group-item" key={id}>
        <ReviewItem {...itemProps} />
      </li>
    );
  })


  return <ul className="list-group review-list">{elements}</ul>;
}