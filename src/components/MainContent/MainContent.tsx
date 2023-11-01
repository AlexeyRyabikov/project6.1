import styles from "./MainContent.module.scss";
import React from "react";
import { TextField, InputLabel } from "@mui/material";
import RegisterWindow from "../../pages/SignUp/RegisterWindow";
import SignInWindow from "../../pages/SignIn/SignInWindow";
import Article from "../Article/Article";
import CreateNewArticleWindow from "../../pages/CreateNewArticle/CreateNewArticleWindow";
import ArticleList from "../../pages/ArticleList/ArticleList";
import EditProfileWindow from "../../pages/EditProfile/EditProfileWindow";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import FullArticlePage from "../../pages/FullArticle/FullArticlePage";
import { useSelector } from "react-redux";
export const routePasses = {
  profile: "/profile",
  signUp: "/sign-up",
  signIn: "/sign-in",
  articles: "/articles",
  newArticle: "/new-article",
};
const { profile, signUp, signIn, articles, newArticle } = routePasses;

export default function MainContent() {
  const { title, tagList, body, description, slug } = useSelector(
    (state: any) => state.OneArticle.Article,
  );
  return (
    <Routes>
      <Route path={profile} Component={EditProfileWindow} />
      <Route path={signUp} Component={RegisterWindow} />
      <Route index element={<ArticleList />} />
      <Route path={articles} element={<ArticleList />} />
      <Route path={newArticle} Component={CreateNewArticleWindow} />
      <Route path={`/${articles}/:slug`} element={<FullArticlePage />} />
      <Route
        path={`/${articles}/:slug/edit`}
        element={
          <CreateNewArticleWindow
            slug={slug}
            edit={true}
            text={body}
            ShortDescription={description}
            TagsArray={tagList}
            title={title}
          />
        }
      />
      <Route path={`/${signIn}`} Component={SignInWindow} />
    </Routes>
  );
}
