function GetArticles(token = "", Offset: number, PageSize: number) {
  const RequestOptions: { headers?: { Authorization: string } } = {};
  if (token !== "") {
    RequestOptions.headers = { Authorization: `Token ${token}` };
  }
  const url = `https://blog.kata.academy/api/articles?offset=${Offset}&limit=${PageSize}`;
  return fetch(url, RequestOptions);
}

function FavoriteArticle(token: string, slug: string, deleteReq = false) {
  //Token
  const RequestOptions = {
    method: deleteReq ? "DELETE" : "POST",
    headers: { Authorization: `Token ${token}` },
  };
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`;
  console.log(url);
  console.log(token);
  return fetch(url, RequestOptions);
}
function GetOneArticle(token: string, slug: string, deleteMode = false) {
  //Token
  const RequestOptions: any = {
    headers: { Authorization: `Token ${token}` },
    method: deleteMode ? "DELETE" : "GET",
  };
  const url = `https://blog.kata.academy/api/articles/${slug}`;
  return fetch(url, RequestOptions);
}
function CreateArticle(
  token: string,
  title: string,
  text: string,
  shortDescription: string,
  TagArray: Array<string>,
) {
  //Token
  const RequestBody = {
    article: {
      title: title,
      description: shortDescription,
      body: text,
      tagList: TagArray,
    },
  };
  const RequestOptions = {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(RequestBody),
  };
  const url = `https://blog.kata.academy/api/articles/`;
  return fetch(url, RequestOptions);
}
function UpdateArticle(
  token: string,
  title: string,
  text: string,
  shortDescription: string,
  slug: string,
) {
  //Token
  const RequestBody = {
    article: {
      title: title,
      description: shortDescription,
      body: text,
    },
  };
  const RequestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(RequestBody),
  };
  const url = `https://blog.kata.academy/api/articles/${slug}`;
  return fetch(url, RequestOptions);
}
export {
  GetArticles,
  FavoriteArticle,
  GetOneArticle,
  CreateArticle,
  UpdateArticle,
};
