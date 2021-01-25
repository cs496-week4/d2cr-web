import React from "react";
import { sorterRawButtons, getSorterDirRawButtons } from "../../util/states";
import "./ReviewMoa.css";

export default function Sorter({ sorter, sorterDir, onSorterChange, onSorterDirChange }) {

    const buttons = sorterRawButtons.map(({ name, label }) => {
      const isActive = sorter === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
          <button type="button" className={`btn ${clazz}`} key={name} onClick={() => onSorterChange(name)}>
            {label}
          </button>
      );
    });

    const dirButtons = getSorterDirRawButtons(sorter).map(({ name, label }) => {
      const isActive = sorterDir === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
          <button type="button" className={`btn ${clazz}`} key={name} onClick={() => onSorterDirChange(name)}>
            {label}
          </button>
      );
    });
 
    return (
      <div style={{margin: 10}}>
        <div className="button-group">{buttons}</div>
        <div className="button-group">{dirButtons}</div>
      </div>
    );
}