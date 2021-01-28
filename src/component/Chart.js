import React, { useState, useEffect } from "react";
import Title from "./Title";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { getMonthlyRate } from "../api";

export default function Chart({ pageId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processData = (rawData) => rawData; // data 가공하도록 수정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getMonthlyRate(pageId);
        console.log("rawData: ", rawData);
        setData(processData(rawData));
      } catch (e) {
        setError(e);
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
    return BarComponent(data);
  };

  return (
    <React.Fragment>
      <Title>월별 평점</Title>
      <ResponsiveContainer>{getComponent()}</ResponsiveContainer>
    </React.Fragment>
  );
}

const BarComponent = (data) => (
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
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="5" stackId="a" fill="#BBB" />
    <Bar dataKey="4" stackId="a" fill="#AFCAD7" />
    <Bar dataKey="3" stackId="a" fill="#3CAEA3" />
    <Bar dataKey="2" stackId="a" fill="#F6D55C" />
    <Bar dataKey="1" stackId="a" fill="#ED553B" />
  </BarChart>
);
