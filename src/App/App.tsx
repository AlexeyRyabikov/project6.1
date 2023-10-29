import React, { useEffect } from "react";
import HeaderUnsigned from "../HeaderUnsigned/HeaderUnsigned";
//import "./App.module.scss";
import styles from "./App.module.scss";
import MainContent from "../MainContent/MainContent";
import HeaderSigned from "../HeaderSigned/HeaderSigned";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { reducer, actions } from "../UserSlice/UserSlice";
import { Provider } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxGetArticles } from "../ArtclesSlice/ArticlesSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.userInfo.token);
  useEffect(() => {
    // @ts-ignore
    dispatch(ReduxGetArticles({ PageNum: 1, PageSize: 10, token: token }));
  }, []);
  const IsLogined = useSelector((state: any) => state.userInfo.IsLogined);
  return (
    <BrowserRouter>
      <div className={styles.App}>
        {IsLogined ? <HeaderSigned /> : <HeaderUnsigned />}
        <div className={styles.Content}>
          <div className={styles.transparent}></div>
          <div style={{ minWidth: "300px" }}>
            <MainContent />
          </div>
          <div className={styles.transparent}></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
