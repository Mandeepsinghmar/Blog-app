import React, { useState } from "react";
import { db, timestamp } from "../firebase";

const CommentInput = ({ user, id, blog, comments }) => {
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(comments ? comments : []);

  console.log(id, user, comments, blog);
  const AddComment = () => {
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
      <input
        type="text"
        placeholder="add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={AddComment}>Add</button>
    </div>
  );
};

export default CommentInput;
