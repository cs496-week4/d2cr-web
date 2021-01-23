import React from "react";
import "./ReviewMoa.css";
import { filterRawButtons as rawButtons} from "../../util/states"

// 별점별 보기 필터
export default function Filter({ filter, onFilterChange }) {
    const buttons = rawButtons.map(({ rate, label }) => {
      const isActive = filter.includes(rate);
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button type="button" className={`btn ${clazz}`} key={rate} onClick={() => onFilterChange(rate)}>
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
}