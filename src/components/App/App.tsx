import React, { useEffect } from "react";
import HeaderUnsigned from "../HeaderUnsigned/HeaderUnsigned";
//import "./App.module.scss";
import styles from "./App.module.scss";
import MainContent from "../MainContent/MainContent";
import HeaderSigned from "../HeaderSigned/HeaderSigned";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { reducer, actions } from "../../stores/UserSlice/UserSlice";
import { Provider } from "react";
import { useSelector } from "react-redux";
import { reduxGetArticles } from "../../stores/ArtclesSlice/ArticlesSlice";
import { AppDispatch, useAppDispatch } from "../../index";

function App() {
  const dispatch = useAppDispatch();
  const token = useSelector((state: any) => state.userInfo.token);
  useEffect(() => {
    dispatch(reduxGetArticles({ pageNum: 1, pageSize: 10, token: token }));
  }, []);
  const isLogined = useSelector((state: any) => state.userInfo.isLogined);
  return (
    <BrowserRouter>
      <div className={styles.App}>
        {isLogined ? <HeaderSigned /> : <HeaderUnsigned />}
        <div className={styles.Content}>
          <div className={styles.transparent}></div>
          <div className={styles.MainContent}>
            <MainContent />
          </div>
          <div className={styles.transparent}></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
