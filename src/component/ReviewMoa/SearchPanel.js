import React, {useState} from "react";
import "./ReviewMoa.css";
export default function SearchPanel({onSearchChange}) {
  const [term, setTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setTerm(term);
	};
	
	const handleSubmit = () => {
  	onSearchChange(term);
	}

  return (
    <div>
      <input
        type="text"
        className="form-control search-input"
        placeholder="검색어를 입력하세요!"
        value={term}
        onChange={handleSearchChange}
        onKeyPress={handleSubmit}
      />
      <button type="button" className="btn btn-outline-secondary" onClick={handleSubmit}>
        검색
      </button>
    </div>
  );
	
}
