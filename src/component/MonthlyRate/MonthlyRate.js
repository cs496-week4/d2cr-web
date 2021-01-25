import { Bar } from "@nivo/bar";
import React, { useState, useEffect } from "react";
import { getMonthlyRate } from "../../api";
import badSmiley from "./smiley/bad.png";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

// const keys = ["1", "2", "3", "4", "5"];
const keys = ["1", "2", "3", "4"];

const colors = {
  "1Color": "hsl(44, 70%, 50%)",
  "2Color": "hsl(128, 70%, 50%)",
  "3Color": "hsl(339, 70%, 50%)",
  "4Color": "hsl(233, 70%, 50%)",
  "5Color": "hsl(117, 70%, 50%)",
};

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  indexBy: "date",
  keys,
  padding: 0.2,
  labelTextColor: "inherit:darker(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16,
};

const CustomBarComponent = ({ x, y, width, height, color }) => (
  // <img src={badSmiley} x={x + width / 2} y={y + height / 2} width={width} height={height}/>
  // <svg>
  <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} color={color} />
  //   <image src={badSmiley} width={Math.min(width, height) / 2} height={Math.min(width, height) / 2} />
  // </svg>
);

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "100%",
    margin: 5,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MonthlyRate({ pageId }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const rawData = await getMonthlyRate(pageId);
      setData(
        rawData.map((item) => {
          if (item.date == null)
            return {
              ...item,
              date: "전체 기간",
              ...colors,
            };
          return {
            ...item,
            ...colors,
          };
        })
      );
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <Bar {...commonProps} data={data} innerPadding={2} labelTextColor="inherit:darker(1)" />
      </Card>
    </div>
  );
}

//  {
//    /* <img src={badSmiley} width="100" height="100" /> */
//  }
//  {
//    /* <image xlinkHref={badSmiley} x={100} y={100} width={100} height={100} />
//  <CustomBarComponent x={100} y={100} width={100} height={100} /> */
//  }
//  {
//    /* <Bar {...commonProps} data={data} innerPadding={4} barComponent={CustomBarComponent} labelTextColor="inherit:darker(1)" /> */
//  }
