import React from "react";
import styles from "./HeaderUnsigned.module.scss";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { actions } from "../../stores/UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { routePasses } from "../MainContent/MainContent";

function HeaderUnsigned() {
  const navigate = useNavigate();
  return (
    <div className={styles.Header}>
      <div className={styles.AppName}>
        <Button variant="text" onClick={() => navigate("/")}>
          Realworld Blog
        </Button>
      </div>
      <div>
        <Button
          className={styles.Button}
          component={NavLink}
          to={routePasses.signIn}
        >
          Sign in
        </Button>
      </div>
      <div className={`${styles.ButtonFrame} `}>
        <Button
          className={`${styles.Button} ${styles.ButtonSignIn}`}
          variant="outlined"
          color="success"
          component={NavLink}
          to={routePasses.signUp}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
export default HeaderUnsigned;
