import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  favoriteArticle,
  getOneArticle,
} from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
const initialState = {
  Article: { tagList: [], author: {}, favorited: false },
};
const oneFullArticleSlice = createSlice({
  name: "FullArticle",
  initialState,
  reducers: {
    SetEmptyArticle: (state) => {
      state.Article = { tagList: [], author: {}, favorited: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reduxGetOneArticle.fulfilled, (state, action) => {
      state.Article = action.payload[1].article;
    });
    builder.addCase(favoriteOneArticle.fulfilled, (state, action) => {
      state.Article = action.payload[1].article;
    });
  },
});
const reduxGetOneArticle = createAsyncThunk(
  "FullArticle/ReduxGetOneArticle",
  (slug: string, { getState }) => {
    const presentState: any = getState();
    return getOneArticle(presentState.userInfo.token, slug).then((res) => [
      res.status,
      res.data,
    ]);
  },
);
const favoriteOneArticle = createAsyncThunk(
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
    return favoriteArticle(token, slug, deleteReq).then((res) => [
      res.status,
      res.data,
    ]);
  },
);
const { actions, reducer } = oneFullArticleSlice;
export { reducer, actions, reduxGetOneArticle, favoriteOneArticle };
