// function RegisterRequest(event) {}
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { promises } from "dns";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require("node-fetch");
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
function registerRequest(
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
  return baseRequest()
    .post("users", RequestBody)
    .then((res: any) => {
      return [res.status, res.data, navigate];
    });
}
function logInRequest(email: string, password: string, navigate: any) {
  const RequestBody = {
    user: {
      email: email,
      password: password,
    },
  };
  return baseRequest()
    .post("users/login", RequestBody)
    .then((res: any) => {
      console.log("[efdsf");
      return [res.status, res.data, navigate];
    });
}
function editProfile(
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
  return baseRequest(token)
    .put("user", RequestBody)
    .then((res: any) => {
      return [res.status, res.data, navigate];
    });
}

export { registerRequest, logInRequest, editProfile };
