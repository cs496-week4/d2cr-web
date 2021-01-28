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
  rate: "rate", // 별점순
  date: "date", // 날짜순
  none: "none",
};

const sorterDirState = {
  low: "lower first", // 낮은 것부터, 오름차순
  high: "higher first", // 높은 것부터, 내림차순
  none: "none",
};

const sorterLabel = {
  [sorterState.rate]: "평점",
  [sorterState.date]: "날짜",
};


const sorterRawButtons = [
  { name: sorterState.rate, label: "평점" },
  { name: sorterState.date, label: "날짜" },
  { name: sorterState.none, label: "초기화" },
];

const getSorterDirLabel = (sorter, sorterDir) => {
  switch (sorter) {
    case sorterState.rate:
      return sorterDir === sorterDirState.low ? "낮은 리뷰부터" : "높은 리뷰부터";

    default:
      // case sorterState.date:
      return sorterDir === sorterDirState.low ? "오래된 리뷰부터" : "최신 리뷰부터";
  }
};

const CONTRIBUTE_MSG = {
  success: "success",
  failure: "failure",
  no_email: "no_email",
  no_mall: "no_mall",
  no_file: "no_file",
  default: "default",
};


const CONTRIBUTE_TOOLTIP = {
  [CONTRIBUTE_MSG.success]: "업로드 성공! 관리자 확인 후 승인됩니다 😊",
  [CONTRIBUTE_MSG.failure]: "업로드가 실패했습니다. 인터넷 연결을 확인해주세요. 😶",
  [CONTRIBUTE_MSG.no_email]: "이메일을 입력해주세요!",
  [CONTRIBUTE_MSG.no_mall]: "타겟 쇼핑몰 주소를 하나 이상 입력해주세요!",
  [CONTRIBUTE_MSG.no_file]: "스크래핑 API (js 파일)을 함께 첨부해주세요! ",
  [CONTRIBUTE_MSG.default]: "기여해주셔서 감사합니다 😍",
};



module.exports = {
  rateFilterState,
  sorterState,
  sorterDirState,
  rateFilterRawButtons,
  sorterRawButtons,
  getSorterDirLabel,
  sorterLabel,
  CONTRIBUTE_MSG,
  CONTRIBUTE_TOOLTIP,
};
