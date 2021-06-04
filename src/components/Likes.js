import React, { useState } from "react";
import { db, FieldValue } from "../firebase";

const Likes = ({ blogId, user, totalLikes, likedBlog }) => {
  const [toggleLiked, setToggleLiked] = useState(likedBlog);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    if (db) {
      await db
        .collection("blogs")
        .doc(blogId)
        .update({
          likes: toggleLiked
            ? FieldValue.arrayRemove(user.userId)
            : FieldValue.arrayUnion(user.userId),
        });

      setLikes(() => (toggleLiked ? likes - 1 : likes + 1));
    }
  };
  return (
    <div>
      <p
        style={{
          color: toggleLiked ? "red" : "blue",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleToggleLiked}
      >
        like {totalLikes}
      </p>
    </div>
  );
};

export default Likes;
