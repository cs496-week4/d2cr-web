import ReviewItem from "./ReviewItem";
import "./ReviewMoa.css";
import "./ReviewList.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {rating} from "../../util/format"

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
  },
  root: {
    width: "100%",
    margin: 5,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function ReviewList({ reviews }) {
  const classes = useStyles();

  const elements = reviews.map((item, id) => {
    return (
      <Card className={classes.root} key={item._id}>
        <CardHeader title={item.user} subheader={item.date} action={rating[Number(item.rate)]} />
        <CardContent> {item.content} </CardContent>
      </Card>
    );
  });

  return <div className={classes.container}>{elements}</div>;
}
