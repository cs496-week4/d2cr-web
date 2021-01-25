import axios from "axios";
// import data from "./data.json"; // mock data for testing

const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

export async function getReviews(pageId, requestData, offset) {
  const apiUrl = process.env.REACT_APP_API_URL + "/page";

  const response = await axios.post(`${apiUrl}/${pageId}/${offset}`, requestData);
  const reviews = response.data;

  // const reviews = await mockAPI(requestData, offset); // call mock API for testing

  return reviews;
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

export async function getMonthlyRate(path) {
  // TODO 서버에 요청보내서 월별 리뷰 데이터 가져오기
}
