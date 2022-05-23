import React, { useState, useEffect } from "react";
import s from "./form.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { toggleRealTime } from "../redux/realTimeSlice";
import { toggleSSR } from "../redux/ssrSlice";
import { loadingToggle } from "../redux/loadingSlice";
import { currentEdit } from "../redux/editSlice";

function Form() {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
  });

  const [creatorError, setCreatorError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const dispatch = useDispatch();
  const currentEdits = useSelector((state) => state.edit);

  useEffect(() => {
    if (currentEdits) setPostData(currentEdits);
  }, [currentEdits]);

  const updatePost = async () => {
    dispatch(loadingToggle(true));
    await fetch(`/api/post/${currentEdits._id}`, {
      method: "PUT",
      body: JSON.stringify({
        creator: postData.creator,
        title: postData.title,
        message: postData.message,
        fileSelected: postData.selectedFile,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPostData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
    });
    dispatch(toggleRealTime());
    dispatch(toggleSSR(true));
    dispatch(currentEdit(null));
    dispatch(loadingToggle(false));
  };

  const uploadPost = async () => {
    dispatch(loadingToggle(true));
    await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        creator: postData.creator,
        title: postData.title,
        message: postData.message,
        fileSelected: postData.selectedFile,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPostData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
    });
    dispatch(toggleRealTime());
    dispatch(toggleSSR(true));
    dispatch(loadingToggle(false));
  };

  const sendPost = (e) => {
    e.preventDefault();
    setCreatorError(true);
    setTitleError(true);
    setMessageError(true);

    if (postData.creator) {
      setCreatorError(false);
    }
    if (postData.title) {
      setTitleError(false);
    }
    if (postData.message) {
      setMessageError(false);
    }

    if (postData.creator && postData.title && postData.message) {
      if (currentEdits) updatePost();
      else uploadPost();
    }
  };

  return (
    <main className={s.forms}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={s.formContainer}
        onSubmit={sendPost}
      >
        <h1>Create A Blog</h1>
        <div className={s.inputContainer}>
          <TextField
            id="outlined-error-helper-text"
            helperText={creatorError ? "Please enter a name" : ""}
            label="Creator"
            variant="outlined"
            style={{ width: `100%` }}
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
            error={creatorError}
          />
          <TextField
            id="outlined-error-helper-text"
            label="Title"
            helperText={titleError ? "Please enter a title" : ""}
            variant="outlined"
            style={{ width: `100%` }}
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            error={titleError}
          />
          <TextField
            id="outlined-error-helper-text"
            label="Message"
            helperText={messageError ? "Please enter a message" : ""}
            variant="outlined"
            style={{ width: `100%` }}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            error={messageError}
          />
        </div>

        <div className={s.fileContainer}>
          <FileBase64
            className={s.file}
            type="file"
            multiple={false}
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </Box>
    </main>
  );
}

export default Form;
