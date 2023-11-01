import styles from "./SignInWindow.module.scss";
import React, { useState } from "react";
import { Button, InputLabel, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reduxLogIn } from "../../stores/UserSlice/UserSlice";
import { logInRequest } from "../../stores/UserFetchFunctions/FetchFunctions";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../index";
import { routePasses } from "../../components/MainContent/MainContent";
export default function SignInWindow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isValidEmail = (email: string) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
      ? true
      : "e-mail некорректен";
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  }: any = useForm({ mode: "onSubmit" });
  return (
    <div>
      <div className={`${styles.EntryWindow} ${styles.register}`}>
        <div className={styles.header}>Sign in</div>
        <form
          onSubmit={handleSubmit(({ email, password }: any, event: any) => {
            event.preventDefault();
            dispatch(
              reduxLogIn({
                email: email,
                password: password,
                navigate: navigate,
                setError: setError,
              }),
            );
          })}
        >
          <div className={styles.InputBlock}>
            <InputLabel htmlFor="Email address" className={styles.inputLabel}>
              Email address
            </InputLabel>
            <TextField
              id="Email address"
              label="Email address"
              variant="outlined"
              {...register("email", {
                required: "необходимо ввести почту",
                validate: isValidEmail,
              })}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
              className={styles.input}
            />
          </div>
          <div className={styles.InputBlock}>
            <InputLabel htmlFor="Password" className={styles.inputLabel}>
              Password
            </InputLabel>
            <TextField
              id="Password"
              label="Password"
              variant="outlined"
              type="password"
              className={styles.input}
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
              {...register("password", {
                required: "необходимо ввести пароль",
              })}
            />
          </div>
          <div className={styles.Button}>
            <Button type="submit" variant="contained" className={styles.Button}>
              Login
            </Button>
          </div>
          <div className={styles.SignInString}>
            Dont have an account?{" "}
            <NavLink to={`/${routePasses.signUp}`}>Sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
