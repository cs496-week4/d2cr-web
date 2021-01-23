import React from "react";
import { sorterRawButtons, getSorterDirRawButtons } from "../../util/states";
import "./ReviewMoa.css";

export default function Sorter({ sorter, sorterDir, onSorterChange, onSorterDirChange }) {

    const buttons = sorterRawButtons.map(({ name, label }) => {
      const isActive = sorter === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <div>
          <button type="button" className={`btn ${clazz}`} key={name} onClick={() => onSorterChange(name)}>
            {label}
          </button>
        </div>
      );
    });

    const dirButtons = getSorterDirRawButtons(sorter).map(({ name, label }) => {
      const isActive = sorterDir === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <div>
          <button type="button" className={`btn ${clazz}`} key={name} onClick={() => onSorterDirChange(name)}>
            {label}
          </button>
        </div>
      );
    });
 
    return (
      <div>
        <div className="btn-group">{buttons}</div>
        <div className="btn-group">{dirButtons}</div>
      </div>
    );
}