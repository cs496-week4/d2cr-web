import React from "react";
import Title from "./Title";
import { makeStyles } from "@material-ui/core/styles";
import { generateCountriesData, sets } from '@nivo/generators'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { useTheme } from "@material-ui/core/styles";

const keys = ["hot dogs", "burgers", "sandwich", "kebab", "fries", "donut"];

const commonProps = {
  width: 400,
  height: 300,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  indexBy: "date",
  keys,
  data: generateCountriesData(keys, { size: 7 }),
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

const data = [
  {
    date: "2020. 08",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: "2019. 08",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: "2020. 10",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    date: "2021. 02",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    date: "2018. 08",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    date: "2019. 09",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    date: "2021. 04",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    date: "2021. 04",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    date: "2021. 04",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];



export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>월별 평점</Title>
      <ResponsiveContainer>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      {/* <ResponsiveBar {...commonProps} /> */}
    </React.Fragment>
  );
}
