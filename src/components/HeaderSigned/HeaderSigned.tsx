import styles from "./HeaderSigned.module.scss";
import { Box, Button } from "@mui/material";
import React from "react";
import { actions } from "../../stores/UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//@ts-ignore ts ругается на импорт картинки как компонента
import iconSrc from "./IconFace.svg";
import { routePasses } from "../MainContent/MainContent";
import { useAppDispatch } from "../../index";
const { LogOut } = actions;
export default function HeaderSigned() {
  const currentName = useSelector((state: any) => state.userInfo.info.name);
  const imageURL = useSelector((state: any) => state.userInfo.info.imageURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.Header}>
      <div className={styles.AppName}>
        <Button variant="text" onClick={() => navigate("")}>
          Realworld Blog
        </Button>
      </div>
      <div className={styles.Frame}>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => navigate(routePasses.newArticle)}
        >
          Create article
        </Button>
      </div>
      <div className={`${styles.Frame} ${styles.Name}`}>
        <Button
          variant="text"
          onClick={() => navigate(`${routePasses.profile}`)}
        >
          {currentName}
          <div className={styles.IconFrame}>
            <Box
              component="img"
              className={styles.Icon}
              alt="The house from the offer."
              src={imageURL}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = iconSrc;
              }}
            />
          </div>
        </Button>
      </div>
      <div className={styles.Frame}>
        <Button
          variant="outlined"
          color="info"
          onClick={() => dispatch(LogOut(""))}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
