import styles from "./ArticleList.module.scss";
import Article from "../Article/Article";
import React, { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { GetArticles } from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
import { ReduxGetArticles } from "../ArtclesSlice/ArticlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../ArtclesSlice/ArticlesSlice";
import LinearProgress from "@mui/material/LinearProgress";
const { ChangePage } = actions;
export default function ArticleList() {
  const loading = useSelector((state: any) => state.Articles.loading);
  const token = useSelector((state: any) => state.userInfo.token);
  const CurrentPage = useSelector((state: any) => state.Articles.CurrentPage);
  const [PagVal, ChangePagVal] = useState(CurrentPage);
  const dispatch = useDispatch();
  const Articles = useSelector((state: any) => state.Articles.Articles);
  let ArticleObjects;
  if (Array.isArray(Articles)) {
    ArticleObjects = Articles.map((el: any) => {
      return <Article fullArticle={false} article={el} key={el.createdAt} />;
    });
  }
  const HandlePag = (event: any, val: number) => {
    ChangePagVal(val);
    dispatch(ChangePage(val));
    // @ts-ignore
    dispatch(ReduxGetArticles({ PageNum: val, PageSize: 10, token: token }));
  };
  return (
    <div className={styles.ArticleBox}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {ArticleObjects}
      {/*<Article fullArticle={false} />*/}
      {/*<Article fullArticle={false} />*/}
      {/*<Article fullArticle={false} />*/}
      <Pagination
        count={5}
        shape="rounded"
        className={styles.Pagination}
        page={PagVal}
        onChange={HandlePag}
      />
    </div>
  );
}
