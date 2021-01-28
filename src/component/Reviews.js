import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import Title from "./Title";
import SearchPanel from "./SearchPanel";
import { rateFilterState } from "../util/states";
import RateFilter from "./RateFilter";
import { getPage, loadNum } from "../api";
import { getRequestData } from "../util/format";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 650,
  },

  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  tableHead: {
    textAlign: "center",
    minWidth: 100,
    textOverflow: "hidden",
  },

  bodyCell: {},

  filter: {
    display: "inline-block"
  }
}));
export default function Reviews({ pageId }) {
  const classes = useStyles();

  const [reviews, setReviews] = useState([]);

  const [searchKeyword, onSearchChange] = useState("");
  const [rateFilter, setRateFilter] = useState(rateFilterState.all);
  const [offset, setOffset] = useState(0);

  const [reloading, setReloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reviewCount, setReviewCount] = useState(0);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("none");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setOffset(offset + loadNum);
        console.log("데이터를 더 불러오는 중...");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const getCurrentRequestData = () => getRequestData(searchKeyword, rateFilter, order, orderBy);

  useEffect(() => {
    if (offset !== 0) {
      console.log("스크롤의 끝에 도달해서 새로운 데이터를 불러옵니다!");

      async function fetchReviews() {
        const requestData = getCurrentRequestData();
        const pageData = await getPage(pageId, requestData, offset);
        const newReviews = pageData.reviews;
        loadMoreReviews(newReviews);
      }
      fetchReviews();
    }
  }, [offset]);

  useEffect(() => {
    if (reloading === true) {
      console.log("쿼리가 바뀌어서 새로운 데이터를 불러옵니다!");

      // TODO 로딩 중 처리

      const fetchReviews = async () => {
        try {
          setError(null);
          setLoading(true);
          const requestData = getCurrentRequestData();
          const pageData = await getPage(pageId, requestData, 0);
          const newReviews = pageData.reviews;
          setReviewCount(pageData.reviewCount);
          initReviews(newReviews);
          setReloading(false);
          setOffset(0);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchReviews();
    }
  }, [reloading]);

  useEffect(() => {
    setReloading(true);
  }, [searchKeyword, rateFilter, order, orderBy]);

  const loadMoreReviews = (newReviews) => {
    setReviews((reviews) => [...reviews, ...newReviews]);
  };

  const initReviews = (newReviews) => {
    setReviews(newReviews);
  };

  const onRateFilterChange = (_rate) => {
    setRateFilter(getRateFilter(_rate));
    console.log(rateFilter);
  };

  const getRateFilter = (_rate) => {
    if (rateFilter.includes(_rate)) return rateFilter.filter((item) => item !== _rate);
    else return [...rateFilter, _rate];
  };

  const getReviewTable = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    return (
      <Table size="small" stickyHeader>
        <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} openFilter={handleClick} />

        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review._id} className={classes.bodyCell}>
              <TableCell>{review.date}</TableCell>
              <TableCell>{review.name}</TableCell>
              <TableCell>{review.content}</TableCell>
              <TableCell>{review.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      <Title>{`리뷰 목록 (${reviewCount} 개)`}</Title>
      <SearchPanel onSearchChange={onSearchChange} keyword={searchKeyword} />
      {/* <RateFilter rateFilter={rateFilter} onRateFilterChange={onRateFilterChange} /> */}
      <Menu className={classes.filter} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <RateFilter rateFilter={rateFilter} onRateFilterChange={onRateFilterChange} />
      </Menu>

      {getReviewTable()}
    </React.Fragment>
  );
}

const headCells = [
  { id: "date", numeric: false, disablePadding: false, label: "날짜" },
  { id: "writer", numeric: false, disablePadding: false, label: "작성자" },
  { id: "content", numeric: false, disablePadding: false, label: "내용" },
  { id: "rate", numeric: true, disablePadding: false, label: "평점" },
];
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, openFilter } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell className={classes.tableHead} key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            {isSortable(headCell.id) ? (
              <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}

        <TableCell>
          <Tooltip title="평점별 필터링">
            <IconButton aria-label="filter list" aria-haspopup="true" onClick={openFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </TableCell>

      </TableRow>
    </TableHead>
  );
}

const isSortable = (id) => id === "date" || id === "rate";

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};
