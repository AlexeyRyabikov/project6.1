import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import EditProfileWindow from "../EditProfileWindow/EditProfileWindow";
import RegisterWindow from "../RegisterWindow/RegisterWindow";
import ArticleList from "../ArticleList/ArticleList";
import CreateNewArticleWindow from "../CreateNewArticleWindow/CreateNewArticleWindow";
import Article from "../Article/Article";
import SignInWindow from "../SignInWindow/SignInWindow";
import { useDispatch, useSelector } from "react-redux";
import {
  ReduxGetOneArticle,
  actions,
} from "../FullArticleSlice/FullArticleSlice";

export default function FullArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    // @ts-ignore
    dispatch(ReduxGetOneArticle(slug));
  }, []);
  const Atricle = useSelector((state: any) => state.OneArticle.Article);
  return <Article article={Atricle} fullArticle={true} />;
}
