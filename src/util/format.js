import Icon from "@material-ui/core/Icon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";


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

export const rating = {
  1: <SentimentVeryDissatisfiedIcon />,
  2: <SentimentDissatisfiedIcon />,
  3: <SentimentSatisfiedIcon />,
  4: <SentimentSatisfiedAltIcon />,
  5: <SentimentVerySatisfiedIcon />,
};

export const ratingStyle = {
  active: "#facf6e",
  inactive: "#bbb",
};