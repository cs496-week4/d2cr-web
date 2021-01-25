export function getRequestData(searchKeyword, rateFilter, sorter, sorterDir) {
    return {
      search: searchKeyword,
      rateFilter,
      sorter,
      sorterDir,
    };
}

export function removeFirstSlash(str) {
  console.log(str.substring(1, str.length));
  return (str.substring(1, str.length));
}

// TODO 평점(1~5)만큼의 별 컴포넌트 반환하는 함수 만들기