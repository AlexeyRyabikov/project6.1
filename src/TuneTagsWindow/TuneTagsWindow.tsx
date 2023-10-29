import styles from "./TuneTagsWindow.module.scss";
import React, { useState } from "react";
import { Button, InputLabel, TextField } from "@mui/material";
export default function TuneTagsWindow({
  tagsArray = [],
  deleteTag,
  addTag,
  changeTagVal,
}: {
  deleteTag: any;
  addTag: any;
  tagsArray?: Array<string>;
  changeTagVal: any;
}) {
  const [inputValue, changeInput] = useState("");
  const JsxTagsArray = tagsArray.map((item, i, array) => {
    return (
      <div className={styles.RowTuneTag} key={i}>
        <TextField
          id="Email address"
          label="Tag"
          variant="outlined"
          value={item}
          onChange={(event: any) => changeTagVal(i, event.target.value)}
          className={`${styles.input} ${styles.TextArea}`}
        />
        <Button
          variant="outlined"
          size="large"
          color="warning"
          className={styles.Button}
          onClick={() => deleteTag(i)}
        >
          Delete
        </Button>
        {i === array.length - 1 && (
          <Button
            variant="outlined"
            className={styles.ButtonAdd}
            onClick={() => {
              addTag();
              changeInput("");
            }}
          >
            Add Tag
          </Button>
        )}
      </div>
    );
  });
  return (
    <div className={styles.JsxTagsArray}>
      <InputLabel htmlFor="UserName" className={styles.inputLabel}>
        Title
      </InputLabel>
      {JsxTagsArray}
    </div>
  );
}
