import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  LogInRequest,
  RegisterRequest,
} from "../UserFetchFunctions/FetchFunctions";
import { useDispatch } from "react-redux";
import { ReduxGetArticles } from "../ArtclesSlice/ArticlesSlice";
import { EditProfile } from "../UserFetchFunctions/FetchFunctions";
const LoggingIn = (state: any, action: any) => {
  console.log(action.payload);
  state.Info.email = action.payload[1].user.email;
  state.Info.name = action.payload[1].user.username;
  state.Info.ImageURL = action.payload[1].user.image
    ? action.payload[1].user.image
    : "";
  state.token = action.payload[1].user.token;
  state.IsLogined = true;
  action.payload[2]("/");
};
const initialState = {
  IsLogined: false,
  Info: { name: "", email: "", ImageURL: "" },
  token: "",
};
const Reducers = createSlice({
  name: "Reducers",
  initialState,
  reducers: {
    LogOut: (state, action) => {
      state.IsLogined = false;
      state.Info = { name: "", email: "", ImageURL: "" };
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ReduxLogIn.fulfilled, LoggingIn)
      .addCase(ReduxRegister.fulfilled, LoggingIn)
      .addCase(ReduxEditProfile.fulfilled, LoggingIn);
  },
});
const ReduxLogIn = createAsyncThunk(
  "Reducers/loginFetch",
  ({ email, password, navigate, setError }: any, { dispatch, getState }) => {
    return LogInRequest(email, password, navigate).then((res: Array<any>) => {
      console.log(res);
      if (res[0] === 422) {
        setError("password", {
          type: "server",
          message: "пароль или логин неверен",
        });
        setError("email", {
          type: "server",
          message: "пароль или логин неверен",
        });
      }
      const state: any = getState();
      dispatch(
        // @ts-ignore
        ReduxGetArticles({
          PageNum: state.Articles.CurrentPage,
          PageSize: 10,
          token: res[1].user.token,
        }),
      );
      return res;
    });
  },
);
const ReduxRegister = createAsyncThunk(
  "Reducers/ReduxRegisterFetch",
  ({ username, email, password, navigate }: any, { dispatch, getState }) => {
    return RegisterRequest(username, email, password, navigate).then(
      (res: Array<any>) => {
        const state: any = getState();
        dispatch(
          // @ts-ignore
          ReduxGetArticles({
            PageNum: state.Articles.CurrentPage,
            PageSize: 10,
            token: res[1].user.token,
          }),
        );
        return res;
      },
    );
  },
);
const ReduxEditProfile = createAsyncThunk(
  "Reducers/ReduxEditProfileFetch",
  (
    { username, email, password, navigate, newPictureUrl }: any,
    { dispatch, getState }: any,
  ) => {
    const { token } = getState().userInfo;
    return EditProfile(
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
const { actions, reducer } = Reducers;
export { reducer, actions, ReduxLogIn, ReduxRegister, ReduxEditProfile };
