import styles from "./MainContent.module.scss";
import React from "react";
import { TextField, InputLabel } from "@mui/material";
import RegisterWindow from "../RegisterWindow/RegisterWindow";
import SignInWindow from "../SignInWindow/SignInWindow";
import Article from "../Article/Article";
import CreateNewArticleWindow from "../CreateNewArticleWindow/CreateNewArticleWindow";
import ArticleList from "../ArticleList/ArticleList";
import EditProfileWindow from "../EditProfileWindow/EditProfileWindow";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import FullArticlePage from "../FullArticlePage/FullArticlePage";
import { useSelector } from "react-redux";
export default function MainContent() {
  const { title, tagList, body, description, slug } = useSelector(
    (state: any) => state.OneArticle.Article,
  );
  return (
    <Routes>
      <Route path="/profile" Component={EditProfileWindow} />
      <Route path="/sign-up" Component={RegisterWindow} />
      <Route index element={<ArticleList />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/new-article" Component={CreateNewArticleWindow} />
      <Route path="/articles/:slug" element={<FullArticlePage />} />
      <Route
        path="/articles/:slug/edit"
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
      <Route path="/sign-in" Component={SignInWindow} />
    </Routes>
  );
}
