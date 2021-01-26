import React, {useState} from "react";
import "./ReviewMoa.css";
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
    <div className="search-panel">
      <input
        type="text"
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
