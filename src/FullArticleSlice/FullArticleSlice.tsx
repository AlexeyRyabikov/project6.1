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
      state.Article = action.payload[1].article;
    });
    builder.addCase(FavoriteOneArticle.fulfilled, (state, action) => {
      state.Article = action.payload[1].article;
    });
  },
});
const ReduxGetOneArticle = createAsyncThunk(
  "FullArticle/ReduxGetOneArticle",
  (slug: string, { getState }) => {
    const PresentState: any = getState();
    return GetOneArticle(PresentState.userInfo.token, slug).then((res) =>
      Promise.all([res.status, res.json()]),
    );
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
    return FavoriteArticle(token, slug, deleteReq).then((res) =>
      Promise.all([res.status, res.json()]),
    );
  },
);
const { actions, reducer } = OneFullArticleSlice;
export { reducer, actions, ReduxGetOneArticle, FavoriteOneArticle };
