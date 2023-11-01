import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Article from "../../components/Article/Article";
import SignInWindow from "../SignIn/SignInWindow";
import { useDispatch, useSelector } from "react-redux";
import {
  reduxGetOneArticle,
  actions,
} from "../../stores/FullArticleSlice/FullArticleSlice";

export default function FullArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    // @ts-ignore
    dispatch(reduxGetOneArticle(slug));
  }, []);
  const article = useSelector((state: any) => state.OneArticle.Article);
  return <Article article={article} fullArticle={true} />;
}
