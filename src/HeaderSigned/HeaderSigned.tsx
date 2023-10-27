import styles from "./HeaderSigned.module.scss";
import { Box, Button } from "@mui/material";
import React from "react";
import { actions } from "../UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { LogOut } = actions;
export default function HeaderSigned() {
  const CurrentName = useSelector((state: any) => state.userInfo.Info.name);
  const ImageURL = useSelector((state: any) => state.userInfo.Info.ImageURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.Header}>
      <div className={styles.AppName}>
        <Button variant="text" onClick={() => navigate("/articles")}>
          Realworld Blog
        </Button>
      </div>
      <div className={styles.Frame}>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => navigate("/new-article")}
        >
          Create article
        </Button>
      </div>
      <div className={`${styles.Frame} ${styles.Name}`}>
        <Button variant="text" onClick={() => navigate("/profile")}>
          {CurrentName}
        </Button>
      </div>
      <div className={styles.Frame}>
        <Box
          component="img"
          className={styles.Icon}
          width="50px"
          height="50px"
          alt="The house from the offer."
          src={ImageURL}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/IconFace.svg";
          }}
        />
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
