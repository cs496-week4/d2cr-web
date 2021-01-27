import Icon from "@material-ui/core/Icon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { sorterDirState } from "./states";


export function getRequestData(searchKeyword, rateFilter, order, orderBy) {
    return {
      search: searchKeyword,
      rateFilter,
      sorter: orderBy,
      sorterDir: (order === "asc") ? sorterDirState.high : sorterDirState.low,
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