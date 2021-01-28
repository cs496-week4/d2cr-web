import axios from "axios";
import { printFormData } from "../util/format";

// import data from "./data.json"; // mock data for testing

const multipartHeaders = {
  "content-type": "multipart/form-data",
};

export const loadNum = Number(process.env.REACT_APP_LOAD_NUM);

export async function getPage(pageId, requestData, offset) {
  const apiUrl = process.env.REACT_APP_API_URL + "/page";
  console.log(`${apiUrl}/${pageId}/${offset}`);
  console.log("request Data ", requestData);
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
  return response.data.productUrl; // hello 여야 함

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

export async function getMonthlyRate(pageId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/monthly";
  const response = await axios.get(`${apiUrl}/${pageId}`);
  return response.data;
}

export async function getProductUrl(pageId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/product";
  const response = await axios.get(`${apiUrl}/${pageId}`);
  console.log(response);
  return response.data.productUrl;
}

export async function postContribute(formData) {
  printFormData(formData);
  const apiUrl = process.env.REACT_APP_API_URL + "/contribute";
  // const response = await axios.post(`${apiUrl}`, formData);

  try {
    const response = await axios.post(`${apiUrl}`, formData, { headers: multipartHeaders });
    return response.data;
  } catch (e) {
    console.error(e);
    return "failure";
  }
}

export async function getContributeList() {
  const apiUrl = process.env.REACT_APP_API_URL + "/contribute";
  const response = await axios.get(`${apiUrl}`);
  console.log(response);
  return response.data;
}

export async function acceptCard(token, cardId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/contribute/accept";
  const reponse = await axios.post(`${apiUrl}/${cardId}`, {token})
  return reponse.data;
}

export async function rejectCard(token, cardId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/contribute/reject";
  const reponse = await axios.post(`${apiUrl}/${cardId}`, { token });
  return reponse.data;
}

export async function getContributeFile(token, cardId) {
  const apiUrl = process.env.REACT_APP_API_URL + "/contribute/download";
  const response = await axios.get(`${apiUrl}/${cardId}`);
  console.log(response.headers)
    console.log(response.headers);
  return response.data;
}