// function RegisterRequest(event) {}
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { promises } from "dns";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require("node-fetch");
function RegisterRequest(
  username: string,
  email: string,
  password: string,
  navigate: any,
) {
  const RequestBody = {
    user: {
      username: username,
      email: email,
      password: password,
    },
  };
  const RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(RequestBody),
  };
  const url = "https://blog.kata.academy/api/users";
  return fetch(url, RequestOptions).then((res: any) => {
    return Promise.all([res.status, res.json(), navigate]);
  });
}
function LogInRequest(email: string, password: string, navigate: any) {
  const RequestBody = {
    user: {
      email: email,
      password: password,
    },
  };
  const RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(RequestBody),
  };
  const url = "https://blog.kata.academy/api/users/login";
  console.log("Хуй бля", RequestOptions);
  return fetch(url, RequestOptions).then((res: any) => {
    console.log(res);
    return Promise.all([res.status, res.json(), navigate]);
  });
}
function EditProfile(
  NewName: string,
  email: string,
  password: string,
  newPictureUrl: string | null = null,
  token: string,
  navigate: any,
) {
  const RequestBody = {
    user: {
      email: email,
      username: NewName,
      password: password,
      image: newPictureUrl,
    },
  };
  const RequestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(RequestBody),
  };
  const url = "https://blog.kata.academy/api/user";
  console.log("Хуй бля", RequestOptions);
  return fetch(url, RequestOptions).then((res: any) => {
    return Promise.all([res.status, res.json(), navigate]);
  });
}

export { RegisterRequest, LogInRequest, EditProfile };
