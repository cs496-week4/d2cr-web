import React from "react";
import "./ReviewMoa.css";
export default function SearchPanel({onSearchChange}) {
  const [term, setTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setTerm(term);
  	onSearchChange(term);
  };

  return <input type="text" className="form-control search-input" placeholder="검색어를 입력하세요!" value={term} onChange={handleSearchChange} />;
}
