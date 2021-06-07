import React, { useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { db, timestamp } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentInput = ({ user, id, comments }) => {
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(comments ? comments : []);

  console.log(id, user, comments);
  const AddComment = (e) => {
    e.preventDefault();
    if (user) {
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
      } else {
        toast("Please add something to discussion!", {
          className: "toast",
        });
      }
    } else {
      toast("You must be logged in to join the discussion!", {
        className: "toast",
      });
    }
  };
  console.log(commentsArray);
  return (
    <div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
      <form
        onSubmit={AddComment}
        className="commentInput"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <TextareaAutosize
          className="textarea"
          type="text"
          placeholder="Add to discussion"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            padding: "12px 12px",
            width: "350px",
            border: "1px solid #EBEEF0",

            outline: "none",
            fontSize: "0.9rem",
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
