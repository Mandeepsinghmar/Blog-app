import React, { useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { db, timestamp } from "../firebase";

const CommentInput = ({ user, id, blog, comments }) => {
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(comments ? comments : []);

  console.log(id, user, comments, blog);
  const AddComment = (e) => {
    e.preventDefault();
    if (comment != "") {
      commentsArray.unshift({
        comment: comment,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        userId: user.uid,
      });
      db.collection("blogs")
        .doc(id)

        .update({
          comments: commentsArray,
        })
        .then(() => {
          console.log("commented successful");
        })
        .catch((err) => {
          console.log(err.message);
        });
      setComment("");
    }
  };
  console.log(commentsArray);
  return (
    <div>
      <form
        onSubmit={AddComment}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <TextareaAutosize
          type="text"
          placeholder="Add to discussion"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            padding: "12px 12px",
            width: "350px",
            border: "1px solid #EBEEF0",

            outline: "none",
          }}
        />
        <button
          onClick={AddComment}
          style={{ marginLeft: "20px", height: "35px", width: "60px" }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
