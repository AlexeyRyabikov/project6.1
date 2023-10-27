import styles from "./Article.module.scss";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import {
  ReduxFavoriteArticle,
  ReduxGetArticles,
} from "../ArtclesSlice/ArticlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteOneArticle } from "../FullArticleSlice/FullArticleSlice";
import { GetOneArticle } from "../ArticlesFetchFunctions/ArticlesFetchFunctions";
const KeyStore = {
  MaxVal: 0,
  GetKey: function () {
    this.MaxVal += 1;
    return this.MaxVal;
  },
};
export default function Article({
  fullArticle = false,
  article,
}: {
  fullArticle?: boolean;
  article: any;
}) {
  const {
    tagList,
    title,
    description,
    body,
    favoritesCount,
    favorited,
    slug,
    author,
  } = article;
  const { username, image } = author;
  //if (fullArticle) {
  const id = String(useParams().id);
  const JsxTagArray = tagList.map((el: string) => {
    return (
      <Chip
        label={el}
        key={KeyStore.GetKey()}
        variant="outlined"
        size="small"
      />
    );
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, CurrentPage } = useSelector((state: any) => state.userInfo);
  const isLogined = useSelector((state: any) => state.userInfo.IsLogined);
  function CreateHandleLikeFunction(
    isLogined: boolean,
    isLiked: boolean = favorited,
  ) {
    const NeededFunc = fullArticle ? FavoriteOneArticle : ReduxFavoriteArticle;
    if (isLogined) {
      if (!isLiked) {
        return () => {
          // @ts-ignore
          dispatch(
            // @ts-ignore
            NeededFunc({
              token: token,
              slug: slug,
            }),
          );
        };
      }
      if (isLiked) {
        // @ts-ignore
        return () => {
          console.log("fff");
          dispatch(
            // @ts-ignore
            NeededFunc({
              token: token,
              slug: slug,
              deleteReq: true,
            }),
          );
        };
      }
    }
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandleLike = CreateHandleLikeFunction(true);
  // else {
  //   return () => {};
  // }
  //}
  return (
    <div className={styles.ArticleWindow}>
      <div className={styles.Header}>
        <div className={styles.ArticleInfo}>
          <div style={{ height: "35px" }}>
            <Button
              variant="text"
              onClick={() => navigate(`/articles/${slug}`)}
            >
              {title}
            </Button>
            <IconButton
              color="primary"
              style={{ fontSize: "12px" }}
              onClick={CreateHandleLikeFunction(isLogined)} //HandleLikeFunction(true)}
            >
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              {favoritesCount}
            </IconButton>
          </div>
          <div>{JsxTagArray}</div>
          {/*<Chip label="tag1" variant="outlined" size="small" />*/}
          {/* eslint-disable-next-line react/jsx-no-undef */}
        </div>
        <div className={styles.AuthorInfo}>
          <div className={styles.AuthorStrings}>
            <div className={styles.AuthorName}>{username}</div>
            <div className={styles.AuthorDate}>March 5, 2020</div>
          </div>
          <div>
            <Box
              component="img"
              className={styles.Icon}
              width="50px"
              height="50px"
              alt="The house from the offer."
              src={image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/IconFace.svg";
              }}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.Header} ${styles.HeaderButtons}`}>
        <div
          className={
            fullArticle ? styles.ArticleBriefing : styles.BlackArticleBriefing
          }
        >
          {description}
        </div>
        {fullArticle && (
          <>
            <div className={styles.Margins}>
              <Button
                variant="outlined"
                color="warning"
                className={`${styles.DeleteButton}`}
                onClick={handleClickOpen}
                // onClick={(event) => {
                //   GetOneArticle(token, slug, true).then((res) =>
                //     console.log(res),
                //   );
                //}}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure to delete this article?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      GetOneArticle(token, slug, true)
                        .then((res) => console.log(res))
                        .then(() => {
                          dispatch(
                            // @ts-ignore
                            ReduxGetArticles({
                              PageNum: CurrentPage,
                              PageSize: 10,
                              token: token,
                            }),
                          );
                          navigate("/articles");
                        });
                    }}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className={styles.Margins}>
              <Button
                variant="outlined"
                color="success"
                className={`${styles.EditButton} ${styles.Margins}`}
                onClick={() => navigate(`/articles/${slug}/edit`)}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
      {fullArticle && (
        <div className={styles.content}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  );
}
