import React from "react";
import styles from "./HeaderUnsigned.module.scss";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { actions } from "../UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function HeaderUnsigned() {
  const name = useSelector((state: any) => state.userInfo.Info.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.Header}>
      <div className={styles.AppName}>
        <Button variant="text" onClick={() => navigate("/articles")}>
          Realworld Blog
        </Button>
      </div>
      <div>
        <Button className={styles.Button} component={NavLink} to="/sign-in">
          Sign in
        </Button>
      </div>
      <div className={`${styles.ButtonFrame} `}>
        <Button
          className={`${styles.Button} ${styles.ButtonSignIn}`}
          variant="outlined"
          color="success"
          component={NavLink}
          to="/sign-up"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
export default HeaderUnsigned;
