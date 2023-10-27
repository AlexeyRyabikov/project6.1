import styles from "./EditProfileWindow.module.scss";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReduxEditProfile } from "../UserSlice/UserSlice";
// import
export default function EditProfileWindow() {
  const CurrentName = useSelector((state: any) => state.userInfo.Info.name);
  const CurrentEmail = useSelector((state: any) => state.userInfo.Info.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidURL = (email: string) =>
    // eslint-disable-next-line no-useless-escape
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      email,
    )
      ? true
      : "URL некорректен";
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
    watch,
    formState: { errors },
  }: any = useForm({ mode: "onSubmit" });
  return (
    <div className={`${styles.EntryWindow} ${styles.register}`}>
      <div className={styles.header}>Edit profile</div>
      <form
        onSubmit={handleSubmit((data: any, event: any) => {
          alert(JSON.stringify(data));
          const { username, email, password, imageURL } = data;
          dispatch(
            // @ts-ignore
            ReduxEditProfile({
              username: username,
              email: email,
              password: password,
              newPictureUrl: imageURL,
              navigate: navigate,
            }),
          );
        })}
      >
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="UserName" className={styles.inputLabel}>
            UserName
          </InputLabel>
          <TextField
            {...register("username")}
            helperText={errors.username?.message}
            error={errors.username}
            id="UserName"
            label="user name"
            defaultValue={CurrentName}
            className={styles.input}
            variant="outlined"
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Email address" className={styles.inputLabel}>
            Email Adress
          </InputLabel>
          <TextField
            {...register("email", { validate: isValidEmail })}
            helperText={errors.email?.message}
            error={errors.email}
            id="Email address"
            label="new Email"
            variant="outlined"
            defaultValue={CurrentEmail}
            className={styles.input}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="NewPassword" className={styles.inputLabel}>
            New Password
          </InputLabel>
          <TextField
            {...register("password", {
              minLength: { value: 6, message: "минимум 6" },
              maxLength: { value: 40, message: "максимум 40" },
            })}
            helperText={errors.password?.message}
            error={errors.password}
            id="NewPassword"
            label="New password"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="AvatarImage" className={styles.inputLabel}>
            Avatar Image(url)
          </InputLabel>
          <TextField
            id="AvatarImage"
            label="Avatar image"
            variant="outlined"
            className={styles.input}
            helperText={errors.imageURL?.message}
            error={errors.imageURL}
            {...register("imageURL", { validate: isValidURL })}
          />
        </div>
        <Button type="submit" variant="contained" className={styles.Button}>
          Create
        </Button>
      </form>
    </div>
  );
}
