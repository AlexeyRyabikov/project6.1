import axios from "axios";
import { routePasses } from "../../components/MainContent/MainContent";
function baseRequest(token = "") {
  return axios.create({
    baseURL: "https://blog.kata.academy/api/",
    timeout: 1000,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
}
function getArticles(token = "", Offset: number, PageSize: number) {
  return baseRequest(token)
    .get(`articles?offset=${Offset}&limit=${PageSize}`)
    .then((res: any) => {
      return res.data;
    });
}

function favoriteArticle(token: string, slug: string, deleteReq = false) {
  const url = `https://blog.kata.academy/api${routePasses.articles}/${slug}/favorite`;
  return baseRequest(token).request({
    url: `articles/${slug}/favorite`,
    method: deleteReq ? "DELETE" : "POST",
  });
}
function getOneArticle(token: string, slug: string, deleteMode = false) {
  return baseRequest(token).request({
    url: `articles/${slug}`,
    method: deleteMode ? "DELETE" : "GET",
  });
}
function createArticle(
  token: string,
  title: string,
  text: string,
  shortDescription: string,
  TagArray: Array<string>,
) {
  //Token
  const requestBody = {
    article: {
      title: title,
      description: shortDescription,
      body: text,
      tagList: TagArray,
    },
  };
  return baseRequest(token).post(`${routePasses.articles}/`, requestBody);
}
function updateArticle(
  token: string,
  title: string,
  text: string,
  shortDescription: string,
  slug: string,
) {
  //Token
  const requestBody = {
    article: {
      title: title,
      description: shortDescription,
      body: text,
    },
  };
  return baseRequest(token).put(`${routePasses.articles}/${slug}`, requestBody);
}
export {
  getArticles,
  favoriteArticle,
  getOneArticle,
  createArticle,
  updateArticle,
};
