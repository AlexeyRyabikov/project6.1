import styles from "../RegisterWindow/RegisterWindow.module.scss";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
  Button,
  FormHelperText,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions, ReduxRegister } from "../UserSlice/UserSlice";
import { useForm } from "react-hook-form";
function RegisterWindow(): any {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({ mode: "onSubmit" });
  const isValidEmail = (email: string) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );
  console.log(errors);
  const handleEmailValidation = (email: string) => {
    const isValid = isValidEmail(email);
    return isValid ? isValid : "e-mail некорректен";
  };
  const PasswordMatch = (value: string, formvalues: any) => {
    console.log(formvalues);
    return formvalues.Password === formvalues.PasswordRepeat
      ? true
      : "пароли должны совпадать";
  };
  return (
    <div className={`${styles.EntryWindow} ${styles.register}`}>
      <div className={styles.header}>Create new account</div>
      <form
        onSubmit={handleSubmit((data: any, event: any) => {
          event.preventDefault();
          const { UserName, Email, Password } = data;
          dispatch(
            // @ts-ignore
            ReduxRegister({
              username: UserName,
              email: Email,
              password: Password,
              navigate: navigate,
            }),
          );
        })}
      >
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="UserName" className={styles.inputLabel}>
            Username
          </InputLabel>
          <TextField
            helperText={errors.UserName?.message}
            error={Boolean(errors.UserName)}
            {...register("UserName", {
              minLength: { value: 3, message: "минимум 3" },
              maxLength: { value: 20, message: "максимум 20" },
              required: true,
            })}
            id="UserName"
            label="Username"
            className={styles.input}
            variant="outlined"
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Email address" className={styles.inputLabel}>
            Email address
          </InputLabel>
          <TextField
            helperText={errors.Email?.message}
            error={Boolean(errors.Email)}
            {...register("Email", {
              required: true,
              validate: handleEmailValidation,
            })}
            id="Email address"
            label="Email address"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Password" className={styles.inputLabel}>
            Password
          </InputLabel>
          <TextField
            {...register("Password", {
              minLength: { value: 6, message: "минимум 5" },
              maxLength: { value: 40, message: "максимум 40" },
              required: true,
              validate: PasswordMatch,
            })}
            helperText={errors.Password?.message}
            error={Boolean(errors.Password)}
            id="Password"
            label="Password"
            variant="outlined"
            type="password"
            // value={password}
            // onChange={(e) => SetPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Repeat password" className={styles.inputLabel}>
            Repeat password
          </InputLabel>
          <TextField
            helperText={errors.PasswordRepeat?.message}
            error={Boolean(errors.PasswordRepeat)}
            {...register("PasswordRepeat", {
              required: true,
              validate: PasswordMatch,
            })}
            type="password"
            id="Repeat password"
            label="Repeat password"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <FormControlLabel
          {...register("AgreePersInf", {
            required: "необходимо согласие на обработку персональных данных",
          })}
          control={<Checkbox />}
          label="I agree to the processing of my personal information"
          className={styles.CheckBoxLabel}
        />
        <div>
          <FormControl error>
            {errors.AgreePersInf && (
              <FormHelperText>{errors.AgreePersInf.message}</FormHelperText>
            )}
          </FormControl>
        </div>
        <Button type="submit" variant="contained" className={styles.Button}>
          Create
        </Button>
      </form>
      <div className={styles.SignInString}>
        Already have an account? <NavLink to="/sign-in">Sign up</NavLink>
      </div>
    </div>
  );
}
export default RegisterWindow;
