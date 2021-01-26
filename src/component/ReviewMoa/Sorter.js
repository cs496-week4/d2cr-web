import React from "react";
import { sorterLabel, getSorterDirLabel, sorterState, sorterDirState } from "../../util/states";
import "./ReviewMoa.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Sorter({ sorter, sorterDir, onSorterChange, onSorterDirChange, onInit }) {
  const classes = useStyles();

  const getSorterStyle = (state) => {
    const isActive = sorter === state;
    return isActive ? "btn-info" : "btn-outline-secondary";
  };

  const getSorterDirStyle = (state) => {
    const isActive = sorterDir === state;
    return isActive ? "btn-info" : "btn-outline-secondary";
  };

  return (
    <div className={classes.root}>
      <div className="button-group">
        <ButtonGroup variant="contained">
          <Button onClick={() => onSorterChange(sorterState.rate)}> {sorterLabel[sorterState.rate]}</Button>
          <Button onClick={() => onSorterChange(sorterState.date)}> {sorterLabel[sorterState.date]}</Button>
        </ButtonGroup>

        <ButtonGroup variant="contained">
          <Button onClick={() => onSorterDirChange(sorterDirState.low)}> {getSorterDirLabel(sorter, sorterDirState.low)}</Button>
          <Button onClick={() => onSorterDirChange(sorterDirState.high)}> {getSorterDirLabel(sorter, sorterDirState.high)}</Button>
        </ButtonGroup>

        {/* <button type="button" className={`btn ${getSorterClazz(sorterState.rate)}`} >
          {sorterLabel[sorterState.rate]}
        </button>
        <button type="button" className={`btn ${getSorterClazz(sorterState.date)}`} >
          {sorterLabel[sorterState.date]}
        </button>
      </div>
      <div className="button-group">
        <button type="button" className={`btn ${getSorterDirClazz(sorterDirState.low)}`} >
          {getSorterDirLabel(sorter, sorterDirState.low)}
        </button>
        <button type="button" className={`btn ${getSorterDirClazz(sorterDirState.high)}`} >
          {getSorterDirLabel(sorter, sorterDirState.high)}
        </button> */}
      </div>
    </div>
  );
}
