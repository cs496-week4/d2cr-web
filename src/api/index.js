import axios from "axios";
import data from "./data.json";
import dotenv from "dotenv";

export async function getReviews(path, requestData) {
  const apiUrl = process.env.REACT_APP_API_URL + "/page";

  //   const response = await axios.post(`${apiUrl}${path}`, requestData);
  //   const reviews = response.data

  const reviews = await mockAPI(); // TODO 위 코드로 대체하여 서버에 요청보내서 리뷰 가져오기

  return reviews;
}

const mockAPI = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("데이터를 다 불러왔어요!");
      resolve(data);
    }, 3);
  });


	export async function getWordCloud(path) {
    // TODO 서버에 요청보내서 word cloud 가져오기
  }

	export async function getMonthlyRate(path) {
    // TODO 서버에 요청보내서 월별 리뷰 데이터 가져오기
  }