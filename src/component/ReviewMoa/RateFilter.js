import React from "react";
import "./ReviewMoa.css";
import { rateFilterRawButtons as rawButtons} from "../../util/states"
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { rating } from "../../util/format";

// 별점별 보기 필터
export default function RateFilter({ rateFilter, onRateFilterChange }) {
    const buttons = rawButtons.map(({ rate }) => {
      const isActive = rateFilter.includes(rate);
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <ListItem style={{}}>
          <button type="button" className={`btn ${clazz}`} key={rate} onClick={() => onRateFilterChange(rate)}>
            {rating[rate]}
          </button>
        </ListItem>
      );
    });

    return <List>{buttons}</List>;
}