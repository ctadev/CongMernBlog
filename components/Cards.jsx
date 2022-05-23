import React, { useState } from "react";
import s from "./cards.module.scss";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleRealTime } from "../redux/realTimeSlice";
import { toggleSSR } from "../redux/ssrSlice";
import { useDispatch } from "react-redux";
import { currentEdit } from "../redux/editSlice";
import { editToggle } from "../redux/editState";
import { loadingToggle } from "../redux/loadingSlice";

function Cards({ posts }) {
  const [showText, setShowText] = useState(false);
  const [likes, setLikes] = useState(0);
  const dispatch = useDispatch();

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  const likesCount = () => {
    const total = likes + 1;
    setLikes(total);
  };

  const deletePost = async () => {
    dispatch(loadingToggle(true));
    await fetch(`/api/post/${posts._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(toggleRealTime());
    dispatch(toggleSSR(true));
    dispatch(loadingToggle(false));
  };

  const edit = (posts) => {
    dispatch(currentEdit(posts));
    dispatch(editToggle(true));
  };

  return (
    <main className={s.cards}>
      <section className={s.top}>
        <div className={s.creator}>
          <div className="user">
            <h1>{posts.creator}</h1>
            <p>2 months ago</p>
          </div>
          <div className={s.edit_container}>
            <MoreHorizIcon />
            <p onClick={() => edit(posts)}>Edit</p>
          </div>
        </div>
        <Image
          className={s.images}
          alt=""
          layout="fill"
          src={
            posts?.fileSelected ||
            "https://media.istockphoto.com/photos/blog-or-blogging-website-icon-showing-online-journals-and-writing-3d-picture-id1180128505?b=1&k=20&m=1180128505&s=170667a&w=0&h=iWLfqKxr3FB7Ymp2S-GcngDECqS9liRDjAyFArMEIcY="
          }
        />
        <div className={s.overlay}></div>
      </section>

      <section className={s.bottom}>
        <div className={s.info}>
          <h1 className={s.title}>{posts.title}</h1>
          <p className={s.comments} onClick={() => setShowText(!showText)}>
            {showText ? posts.message : truncate(posts.message, 100)}
          </p>
        </div>
        <div className={s.btn}>
          <div className={s.likes} onClick={() => likesCount()}>
            <ThumbUpIcon />
            <p>{likes} Likes</p>
          </div>
          <div className={s.deletes} onClick={() => deletePost()}>
            <DeleteIcon />
            <p>Delete</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cards;
