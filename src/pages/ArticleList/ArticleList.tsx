import styles from "./ArticleList.module.scss";
import Article from "../../components/Article/Article";
import React, { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { getArticles } from "../../stores/ArticlesFetchFunctions/ArticlesFetchFunctions";
import { reduxGetArticles } from "../../stores/ArtclesSlice/ArticlesSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../index";
import { actions } from "../../stores/ArtclesSlice/ArticlesSlice";
import LinearProgress from "@mui/material/LinearProgress";
const { ChangePage } = actions;
export default function ArticleList() {
  const loading = useSelector((state: any) => state.articles.loading);
  const token = useSelector((state: any) => state.userInfo.token);
  const currentPage = useSelector((state: any) => state.articles.currentPage);
  const [PagVal, ChangePagVal] = useState(currentPage);
  const dispatch = useAppDispatch();
  const articles = useSelector((state: any) => state.articles.articles);
  let articleObjects;
  if (Array.isArray(articles)) {
    articleObjects = articles.map((el: any) => {
      return <Article fullArticle={false} article={el} key={el.createdAt} />;
    });
  }
  const handlePage = (event: any, val: number) => {
    ChangePagVal(val);
    dispatch(ChangePage(val));
    dispatch(reduxGetArticles({ pageNum: val, pageSize: 10, token: token }));
  };
  return (
    <div className={styles.ArticleBox}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {articleObjects}
      <Pagination
        count={5}
        shape="rounded"
        className={styles.Pagination}
        page={PagVal}
        onChange={handlePage}
      />
    </div>
  );
}
