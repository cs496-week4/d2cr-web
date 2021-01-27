import React, {useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";

export default function SearchPanel({ onSearchChange, keyword }) {
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const handleSearchChange = (e) => {
    const searchKeyword = e.target.value;
    setSearchKeyword(searchKeyword);
  };

  const handleSubmit = () => {
    onSearchChange(searchKeyword);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <input
        type="text"
        style={{ width: "auto", flexGrow: 1, marginRight: 3 }}
        className="form-control search-input"
        placeholder="검색어를 입력하세요!"
        value={searchKeyword}
        onChange={handleSearchChange}
        onKeyPress={handleSubmit}
      />

      <button type="button" className="btn btn-outline-secondary" onClick={handleSubmit}>
        검색
      </button>
    </div>
  );
}
