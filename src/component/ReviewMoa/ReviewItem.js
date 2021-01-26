import "./ReviewMoa.css";
import "./ReviewList.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { rating } from "../../util/format";

const useStyles = makeStyles((theme) => ({
  item: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    margin: 20,
    display: "flex",
    flexDirection: "column",
  },
}));

export default function ReviewItem({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.item} key={item._id} onClick={() => console.warn(item)}>
      <CardHeader title={item.user} subheader={item.date} action={rating[Number(item.rate)]} />
      <CardContent> {item.content} </CardContent>
    </Card>
  );
}
