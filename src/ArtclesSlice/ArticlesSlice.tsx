import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogInRequest } from "../UserFetchFunctions/FetchFunctions";
import {
  GetArticles,
  FavoriteArticle,
} from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
const initialState = {
  Articles: [],
  CurrentPage: 1,
  loading: false,
};
const Reducers = createSlice({
  name: "Articles",
  initialState,
  reducers: {
    ChangePage: (state, action) => {
      state.CurrentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ReduxGetArticles.fulfilled, (state, action) => {
      console.log(action.payload);
      state.Articles = action.payload.articles;
      state.loading = false;
    });
    builder.addCase(ReduxGetArticles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      ReduxFavoriteArticle.fulfilled,
      (state: any, action: any) => {
        console.log(action.payload[1].article.favoritesCount);
        const IndexLikedArticle = state.Articles.findIndex(
          (val: any) => val.slug === action.payload[1].article.slug,
        );
        console.log(state.Articles[IndexLikedArticle].favoritesCount);
        state.Articles[IndexLikedArticle] = action.payload[1].article;
        // state.Articles[IndexLikedArticle].favorited = true;
        //action.payload.articles;
      },
    );
  },
});
const ReduxGetArticles = createAsyncThunk(
  "Articles/ReduxGetArticles",
  ({
    PageNum,
    PageSize,
    token = "",
  }: {
    PageNum: number;
    PageSize: number;
    token?: string;
  }) => {
    const offset: number = (PageNum - 1) * PageSize;
    return GetArticles(token, offset, PageSize).then((response) => {
      console.log("хуй бля!");
      return response.json();
    });
  },
);
const ReduxFavoriteArticle = createAsyncThunk(
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
    console.log(slug, token);
    return FavoriteArticle(token, slug, deleteReq).then((res) =>
      Promise.all([res.status, res.json()]),
    );
  },
);
const { actions, reducer } = Reducers;
export { reducer, actions, ReduxGetArticles, ReduxFavoriteArticle };
