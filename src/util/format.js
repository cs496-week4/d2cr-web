export function getRequestData(term, rateFilter, sorter, sorterDir) {
    return {
      search: term,
      rateFilter,
      sorter,
      sorterDir,
    };
}

// TODO 평점(1~5)만큼의 별 컴포넌트 반환하는 함수 만들기