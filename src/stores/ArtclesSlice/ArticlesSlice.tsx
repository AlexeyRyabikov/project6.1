import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInRequest } from "../UserFetchFunctions/FetchFunctions";
import {
  getArticles,
  favoriteArticle,
} from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
const initialState = {
  articles: [],
  currentPage: 1,
  loading: false,
};
const reducers = createSlice({
  name: "Articles",
  initialState,
  reducers: {
    ChangePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reduxGetArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.loading = false;
    });
    builder.addCase(reduxGetArticles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      reduxFavoriteArticle.fulfilled,
      (state: any, action: any) => {
        const indexLikedArticle = state.articles.findIndex(
          (val: any) => val.slug === action.payload[1].article.slug,
        );
        state.articles[indexLikedArticle] = action.payload[1].article;
      },
    );
  },
});
const reduxGetArticles = createAsyncThunk(
  "Articles/ReduxGetArticles",
  ({
    pageNum,
    pageSize,
    token = "",
  }: {
    pageNum: number;
    pageSize: number;
    token?: string;
  }) => {
    const offset: number = (pageNum - 1) * pageSize;
    return getArticles(token, offset, pageSize);
  },
);
const reduxFavoriteArticle = createAsyncThunk(
  "Articles/ReduxFavoriteArticle",
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
const { actions, reducer } = reducers;
export { reducer, actions, reduxGetArticles, reduxFavoriteArticle };
