import { sorterDirState, sorterState, rateFilterState } from "./states";

export function reviewReducer(state, action) {
  switch (action.type) {
    case reviewActionTypes.LOAD_MORE_REVIEWS:
      const newReviews = [...state.reviews, ...action.payload];
      console.log("in reducer: ", newReviews);

      return { ...state, reviews: newReviews };

    case reviewActionTypes.SET_SEARCH:
      return { ...state, searchKeyword: action.payload };

    case reviewActionTypes.SET_RATE_FILTER:
      return { ...state, rateFilter: action.payload };

    case reviewActionTypes.SET_SORTER:
      return { ...state, sorter: action.payload };

    case reviewActionTypes.SET_SORTER_DIR:
      return { ...state, sorterDir: action.payload };

    case reviewActionTypes.SET_OFFSET:
      return { ...state, offset: action.payload };

    case reviewActionTypes.INIT_REVIEWS:
        return { ...state, reviews: action.payload };

    default:
      return state;
  }
}

export const reviewActionTypes = {
  GET_REVIEW: "GET_REVIEW",
  SET_SEARCH: "SET_SEARCH",
  SET_RATE_FILTER: "SET_RATE_FILTER",
  SET_SORTER: "SET_SORTER",
  SET_SORTER_DIR: "SET_SORTER_DIR",
  LOAD_MORE_REVIEWS: "LOAD_MORE_REVIEWS",
  SET_OFFSET: "SET_OFFSET",
  INIT_REVIEWS: "INIT_REVIEWS",
};

export const reviewActions = {
  LOAD_MORE_REVIEWS: (reviews) => {
    return {
      type: "LOAD_MORE_REVIEWS",
      payload: reviews,
    };
  },

  INIT_REVIEWS: (reviews) => {
    return  {
        type: "INIT_REVIEWS",
        payload: reviews
    }
  },

  GET_REVIEW: {
    type: "GET_REVIEW",
  },

  SET_SEARCH: (searchKeyword) => {
    return {
      type: "SET_SEARCH",
      payload: searchKeyword,
    };
  },

  SET_RATE_FILTER: (rateFilter) => {
    return {
      type: "SET_RATE_FILTER",
      payload: rateFilter,
    };
  },

  SET_SORTER: (sorter) => {
    return {
      type: "SET_SORTER",
      payload: sorter,
    };
  },

  SET_SORTER_DIR: (sorterDir) => {
    return {
      type: "SET_SORTER_DIR",
      payload: sorterDir,
    };
  },

  SET_OFFSET: (offset) => {
    return {
      type: "SET_OFFSET",
      payload: offset,
    };
  },
};

export const reviewInitialState = {
  reviews: [],
  searchKeyword: "",
  rateFilter: rateFilterState.all,
  sorter: sorterState.date,
  sorterDir: sorterDirState.low,
  offset: 0,
};
