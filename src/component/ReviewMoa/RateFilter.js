import React from "react";
import "./ReviewMoa.css";
import { rateFilterRawButtons as rawButtons } from "../../util/states";
import { rating, ratingStyle } from "../../util/format";
import IconButton from "@material-ui/core/IconButton";

// 별점별 보기 필터
export default function RateFilter({ rateFilter, onRateFilterChange }) {
  const buttons = rawButtons.map(({ rate }) => {
    const isActive = rateFilter.includes(rate);
    return (
      <IconButton style={{ outlineColor: "transparent", color: isActive ? ratingStyle.active : ratingStyle.inactive }} onClick={() => onRateFilterChange(rate)}>
        {rating[rate]}
      </IconButton>
    );
  });

  return <div style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", justifyItems: "center" }}>{buttons}</div>;
}
