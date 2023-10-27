import styles from "./CreateNewArticleWindow.module.scss";
import React, { useState } from "react";
import { Button, InputLabel, TextField } from "@mui/material";
import TuneTagsWindow from "../TuneTagsWindow/TuneTagsWindow";
import { useForm } from "react-hook-form";
import {
  CreateArticle,
  UpdateArticle,
} from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
import { useDispatch, useSelector } from "react-redux";
import { GetArticles } from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
import { Title } from "@mui/icons-material";
import { ReduxGetArticles } from "../ArtclesSlice/ArticlesSlice";
import { useNavigate } from "react-router-dom";
export default function CreateNewArticleWindow({
  edit = false,
  slug = "",
  text = "",
  title = "",
  ShortDescription = "",
  TagsArray = [""],
}: {
  text?: string;
  edit?: boolean;
  title?: string;
  ShortDescription?: string;
  TagsArray?: Array<string>;
  slug?: string;
}) {
  const token = useSelector((state: any) => state.userInfo.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({ mode: "onSubmit" });
  const [tagsArr, settagsArr] = useState(TagsArray);
  function deleteTag(i: number) {
    const newTagsArr = [...tagsArr.slice(0, i), ...tagsArr.slice(i + 1)];
    settagsArr(newTagsArr);
  }
  function addTag() {
    const newTagsArr = [...tagsArr];
    newTagsArr.push("");
    settagsArr(newTagsArr);
  }
  function changeTagVal(i: number, TagVal: string) {
    const newArr = [...tagsArr];
    newArr[i] = TagVal;
    settagsArr(newArr);
  }
  const neededFetchFunc = !edit
    ? (Title: string, ShortDescription: string, Text: string) =>
        CreateArticle(token, Title, Text, ShortDescription, tagsArr)
    : (Title: string, ShortDescription: string, Text: string) =>
        UpdateArticle(token, Title, Text, ShortDescription, slug);
  const dispatch = useDispatch();
  const { CurrentPage } = useSelector((state: any) => state.OneArticle);
  const navigate = useNavigate();
  return (
    <div className={styles.EntryWindow}>
      <div className={styles.WindowName}>
        {!edit ? <span>Create new Article</span> : <span>Edit Article</span>}
      </div>
      <form
        onSubmit={handleSubmit((data: any, event: any) => {
          const { Title, ShortDescription, Text } = data;
          neededFetchFunc(Title, ShortDescription, Text).then(() => {
            // @ts-ignore
            dispatch(
              //@ts-ignore
              ReduxGetArticles({
                token: token,
                PageSize: 10,
                PageNum: CurrentPage,
              }),
            );
            navigate("/");
          });
        })}
      >
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="UserName" className={styles.inputLabel}>
            Title
          </InputLabel>
          <TextField
            {...register("Title", {
              required: "поле обязательно к заполнению",
            })}
            id="Title"
            label="Title"
            className={styles.input}
            variant="outlined"
            defaultValue={title}
            fullWidth
            error={errors.Title}
            helperText={errors.Title?.message}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Email address" className={styles.inputLabel}>
            Short Description
          </InputLabel>
          <TextField
            fullWidth
            {...register("ShortDescription", {
              required: "поле обязательно к заполнению",
            })}
            id="Short description"
            label="Title"
            variant="outlined"
            defaultValue={ShortDescription}
            className={styles.input}
            error={errors.ShortDescription}
            helperText={errors.ShortDescription?.message}
          />
        </div>
        <div className={styles.InputBlock}>
          <InputLabel htmlFor="Email address" className={styles.inputLabel}>
            Text
          </InputLabel>
          <TextField
            {...register("Text", { required: "поле обязательно к заполнению" })}
            fullWidth
            multiline
            defaultValue={text}
            id="Email address"
            label="Text"
            variant="outlined"
            helperText={errors.Text?.message}
            error={errors.Text}
            rows={8}
            className={`${styles.input} ${styles.TextArea}`}
          />
        </div>
        <TuneTagsWindow
          tagsArray={tagsArr}
          deleteTag={deleteTag}
          addTag={addTag}
          changeTagVal={changeTagVal}
        />
        <Button variant="contained" type="submit" className={styles.SendButton}>
          Send
        </Button>
      </form>
    </div>
  );
}
