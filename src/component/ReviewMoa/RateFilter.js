import React from "react";
import "./ReviewMoa.css";
import { rateFilterRawButtons as rawButtons} from "../../util/states"

// 별점별 보기 필터
export default function RateFilter({ rateFilter, onRateFilterChange }) {
    const buttons = rawButtons.map(({ rate, label }) => {
      const isActive = rateFilter.includes(rate);
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button type="button" className={`btn ${clazz}`} key={rate} onClick={() => onRateFilterChange(rate)}>
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
}