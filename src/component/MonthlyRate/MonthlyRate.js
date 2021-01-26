import { Bar } from "@nivo/bar";
import React, { useState, useEffect } from "react";
import { getMonthlyRate } from "../../api";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const keys = ["5", "4", "3", "2", "1"];

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

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 200,
    margin: 5,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MonthlyRate({ pageId }) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processData = (rawData) => rawData.map((item) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getMonthlyRate(pageId);
        setData(processData(rawData))
      }
      catch (e) {
        setError(e)
        console.error(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getComponent = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return null;
    return <Bar {...commonProps} data={data} innerPadding={2} labelTextColor="inherit:darker(1)" />;
  };

  console.log(data);
  return <Card className={classes.container}>{getComponent()}</Card>;
}