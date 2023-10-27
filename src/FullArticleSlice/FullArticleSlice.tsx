import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FavoriteArticle,
  GetOneArticle,
} from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
const initialState = {
  Article: { tagList: [], author: {}, favorited: false },
};
const OneFullArticleSlice = createSlice({
  name: "FullArticle",
  initialState,
  reducers: {
    SetEmptyArticle: (state) => {
      state.Article = { tagList: [], author: {}, favorited: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ReduxGetOneArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      state.Article = action.payload[1].article;
    });
    builder.addCase(FavoriteOneArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      state.Article = action.payload[1].article;
    });
  },
});
const ReduxGetOneArticle = createAsyncThunk(
  "FullArticle/ReduxGetOneArticle",
  (slug: string, { getState }) => {
    const PresentState: any = getState();
    console.log(PresentState.userInfo.token);
    return GetOneArticle(PresentState.userInfo.token, slug).then((res) =>
      Promise.all([res.status, res.json()]),
    );
    // const offset: number = (PageNum - 1) * PageSize;
    // return GetArticles(token, offset, PageSize).then((response) => {
    //   console.log("хуй бля!");
    //   return response.json();
  },
);
const FavoriteOneArticle = createAsyncThunk(
  "FullArticle/FavoriteOneArticle",
  ({
    slug,
    token,
    deleteReq = false,
  }: {
    slug: string;
    token: string;
    deleteReq?: boolean;
  }) => {
    console.log("oneArticle работает");
    console.log(slug, token);
    return FavoriteArticle(token, slug, deleteReq).then((res) =>
      Promise.all([res.status, res.json()]),
    );
  },
);
const { actions, reducer } = OneFullArticleSlice;
export { reducer, actions, ReduxGetOneArticle, FavoriteOneArticle };
