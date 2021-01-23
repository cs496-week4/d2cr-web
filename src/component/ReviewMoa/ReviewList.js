import ReviewItem from "./ReviewItem";
import "./ReviewMoa.css";
import React from "react";

export default function ReviewList({reviews}) {
  const elements = reviews.map((item, id) => {
    return ( // TODO change item key to _id of review schema: key={id} => key={item._id}
      <li className="list-group-item" key={id}> 
        <ReviewItem {...item} />
      </li>
    );
  })


  return <ul className="list-group review-list">{elements}</ul>;
}