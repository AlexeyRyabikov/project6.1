import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  logInRequest,
  registerRequest,
} from "../UserFetchFunctions/FetchFunctions";
import { useDispatch } from "react-redux";
import { reduxGetArticles } from "../ArtclesSlice/ArticlesSlice";
import { editProfile } from "../UserFetchFunctions/FetchFunctions";
const loggingIn = (state: any, action: any) => {
  console.log("работает");
  console.log(action.payload);
  state.info.email = action.payload[1].user.email;
  state.info.name = action.payload[1].user.username;
  state.info.imageURL = action.payload[1].user.image
    ? action.payload[1].user.image
    : "";
  state.token = action.payload[1].user.token;
  state.isLogined = true;
  action.payload[2]("/");
};
const initialState = {
  isLogined: false,
  info: { name: "", email: "", imageURL: "" },
  token: "",
};
const reducers = createSlice({
  name: "Reducers",
  initialState,
  reducers: {
    LogOut: (state: any, action) => {
      state.isLogined = false;
      state.info = { name: "", email: "", imageURL: "" };
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reduxLogIn.fulfilled, loggingIn)
      .addCase(reduxRegister.fulfilled, loggingIn)
      .addCase(reduxEditProfile.fulfilled, loggingIn);
  },
});
const reduxLogIn = createAsyncThunk(
  "reducers/loginFetch",
  ({ email, password, navigate, setError }: any, { dispatch, getState }) => {
    console.log("gfdgd");
    return logInRequest(email, password, navigate).then((res: Array<any>) => {
      console.log(res);
      if (res[0] === 422) {
        setError("password", {
          type: "server",
          message: "пароль или логин неверен",
        });
        setError("Email", {
          type: "server",
          message: "пароль или логин неверен",
        });
      }
      const state: any = getState();
      dispatch(
        // @ts-ignore
        reduxGetArticles({
          pageNum: state.articles.currentPage,
          pageSize: 10,
          token: res[1].user.token,
        }),
      );
      return res;
    });
  },
);
const reduxRegister = createAsyncThunk(
  "reducers/ReduxRegisterFetch",
  (
    { username, email, password, navigate, setError }: any,
    { dispatch, getState },
  ) => {
    return registerRequest(username, email, password, navigate).then(
      (res: Array<any>) => {
        const state: any = getState();
        if (res[0] === 422) {
          if (res[1].errors.username === "is already taken.") {
            setError("UserName", {
              type: "server",
              message: "имя уже используется",
            });
          }
          if (res[1].errors.email === "is already taken.") {
            setError("Email", {
              type: "Email",
              message: "email уже используется",
            });
          }
        }
        dispatch(
          reduxGetArticles({
            pageNum: state.articles.currentPage,
            pageSize: 10,
            token: res[1].user.token,
          }),
        );
        return res;
      },
    );
  },
);
const reduxEditProfile = createAsyncThunk(
  "reducers/ReduxEditProfileFetch",
  (
    { username, email, password, navigate, newPictureUrl }: any,
    { dispatch, getState }: any,
  ) => {
    const { token } = getState().userInfo;
    return editProfile(
      username,
      email,
      password,
      newPictureUrl,
      token,
      navigate,
    ).then((res: Array<any>) => {
      return res;
    });
  },
);
const { actions, reducer } = reducers;
export { reducer, actions, reduxLogIn, reduxRegister, reduxEditProfile };
