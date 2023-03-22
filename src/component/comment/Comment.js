import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { FaMask } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./Comment.module.css";
import Switch from "../switch/Switch";
import Button from "../button/Button";

function Comment({ data, handleOnSubmit, onClickDeleteButton }) {
  const [comment, setComment] = useState("");
  const [statusSwitch, setStatusSwitch] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const calculateTime = (oldDate) => {
    let date1 = new Date();
    let date2 = new Date(oldDate);
    let distanceTime = ((date1 - date2) / (1000 * 3600 * 24)).toFixed(1);
    if (distanceTime <= 0.9) {
      return `${(24 * distanceTime).toFixed(0)} hours ago`;
    }
    return `${(+distanceTime).toFixed(0)} days ago`;
  };

  const handleOnchange = (e) => {
    setComment(e.target.value);
  };

  const handleSwtich = (value) => {
    setStatusSwitch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnSubmit(comment, statusSwitch);
    setComment("");
  };

  const handleDelete = (commentId, commentContent) => {
    onClickDeleteButton(commentId, commentContent);
  };

  if (data.length === 0) {
    return (
      <div>
        <p>This product has no comment</p>
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <div className={styles.imgContainer}>
            <img
              className={styles.avtComment}
              src={`http://localhost:3001/${currentUser.avatar}`}
              alt="Avatar User Comment"
            />
          </div>
          <div className={styles.inputContent}>
            <div className={styles.switchContainer}>
              <span>Anonymous: </span>
              <Switch onChange={handleSwtich} isChecked={statusSwitch} />
            </div>
            <textarea
              rows={4}
              onChange={handleOnchange}
              placeholder="Add a comment ..."
              className={styles.inputComment}
              value={comment}
            ></textarea>
          </div>
          <Button type="submit" className={styles.submitIcon}>
            <BiSend />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((comment, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.imgContainer}>
            <img
              src={`http://localhost:3001/${comment.user.avatar}`}
              alt="Avatar User Comment"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h4 className={styles.name}>
                {comment.user.full_name}{" "}
                {comment.anonymous === true && (
                  <FaMask className={styles.mask} />
                )}
              </h4>
              <p className={styles.commentContent}>{comment.comment}</p>
              <p className={styles.date}>
                {calculateTime(comment.created_date)}
              </p>
            </div>
            {(currentUser.role_id === 2 ||
              currentUser.user_id === comment.user_id) && (
              <IoCloseCircleOutline
                onClick={() =>
                  handleDelete(comment.comment_id, comment.comment)
                }
                className={styles.deleteIcon}
              />
            )}
          </div>
        </div>
      ))}
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <div className={styles.imgContainer}>
          <img
            className={styles.avtComment}
            src={`http://localhost:3001/${currentUser.avatar}`}
            alt="Avatar User Comment"
          />
        </div>
        <div className={styles.inputContent}>
          <div className={styles.switchContainer}>
            <span>Anonymous: </span>
            <Switch onChange={handleSwtich} isChecked={statusSwitch} />
          </div>
          <textarea
            rows={4}
            onChange={handleOnchange}
            placeholder="Add a comment ..."
            className={styles.inputComment}
            value={comment}
          ></textarea>
        </div>
        <Button type="submit" className={styles.submitIcon}>
          <BiSend />
        </Button>
      </form>
    </div>
  );
}

export default Comment;
