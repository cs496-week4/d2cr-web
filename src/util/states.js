const rateFilterState = {
  all: [1, 2, 3, 4, 5],
}; // 별점별로 필터링할거면 다른 방식으로 하는게 좋을듯 (리스트 등)


const rateFilterRawButtons = [
  { rate: 1, label: "매우 별로" },
  { rate: 2, label: "별로" },
  { rate: 3, label: "보통" },
  { rate: 4, label: "좋음" },
  { rate: 5, label: "매우 좋음" },
];


const sorterState = {
    star: "star", // 별점순
    date: "date", // 날짜순
}

const sorterDirState = {
    low: "lower first", // 낮은 것부터, 오름차순
    high: "higher first" // 높은 것부터, 내림차순
}

const sorterRawButtons = [
  { name: sorterState.star, label: "평점" },
  { name: sorterState.date, label: "날짜" },
];

const getSorterDirRawButtons = (sorter) => [
  { name: sorterDirState.high, label: getLabel(sorter, sorterDirState.high) },
  { name: sorterDirState.low, label: getLabel(sorter, sorterDirState.low) },
];

const getLabel = (sorter, sorterDir) => {
    switch (sorter) {
        case (sorterState.star):
            return (sorterDir == sorterDirState.low) ? 
             "낮은 리뷰부터" : "높은 리뷰부터"
    
        case (sorterState.date):
            return sorterDir == sorterDirState.low ? "오래된 리뷰부터" : "최신 리뷰부터";

        default:
            console.error(sorter + "은 등록된 정렬자(sorter)가 아닙니다")
    }
}

module.exports = {
    rateFilterState,
    sorterState,
    sorterDirState, 
    rateFilterRawButtons,
    sorterRawButtons,
    getSorterDirRawButtons,
}

