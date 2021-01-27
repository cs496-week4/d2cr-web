import axios from "axios";
// import data from "./data.json"; // mock data for testing

export const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

export async function getPage(pageId, requestData, offset) {
  const apiUrl = process.env.REACT_APP_API_URL + "/page";
  console.log(`${apiUrl}/${pageId}/${offset}`);
  console.log("request Data ", requestData)
  const response = await axios.post(`${apiUrl}/${pageId}/${offset}`, requestData);
  // const reviews = await mockAPI(requestData, offset); // call mock API for testing

  return response.data;
}

export async function getWordCloudTags(pageId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/morpheme";
  console.log("request url: " + `${apiUrl}/${pageId}`);
  const response = await axios.get(`${apiUrl}/${pageId}`);
  const tags = response.data;
  return tags;
}

export async function helloServer(path, requestData) {
  const apiUrl = process.env.REACT_APP_API_URL + "/hello";
  const response = await axios.get(`${apiUrl}${path}`, requestData);
  return response.data; // hello 여야 함
}

// test function
// const mockAPI = (requestData, offset) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
// 			console.log(`데이터를 다 불러왔어요! ${offset}`);
// 			console.log(data.slice(offset, offset + loadNum));
//       resolve(data.slice(offset, offset + loadNum));
//     }, 3);
//   });

export async function getWordCloud(path) {
  // TODO 서버에 요청보내서 word cloud 가져오기
}

export async function getMonthlyRate(pageId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/monthly";
  const response = await axios.get(`${apiUrl}/${pageId}`);
  return response.data
}

export const monthlyData = [
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