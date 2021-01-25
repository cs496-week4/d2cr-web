import "./ReviewMoa.css";
import React from "react";


export default function AppHeader({ reviewCount }) {
  return (
    <div className="app-header d-flex">
      <h1> 리뷰 편하게 보기 </h1>
      <h2>
        {reviewCount} 개 리뷰
      </h2>
    </div>
  );
}
