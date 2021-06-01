import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, timestamp } from "../firebase";

function CreateBlog({ user }) {
  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  // const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pleaseLogin, setPleaseLogin] = useState(false);

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const createdAt = timestamp();
      const userPicture = user.photoURL;
      const author = user.displayName;
      const userId = user.uid;
      db.collection("blogs").add({
        postedBy: userId,
        user,
        blogName,
        author,
        blogContent,
        createdAt,
        userPicture,
      });
      history.push("/");
    } else {
      e.preventDefault();
      setPleaseLogin(true);
    }
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Name:</label>
        <textarea
          className="blog-name"
          rows="5"
          type="text"
          placeholder="write Your blog name here."
          required
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
        />
        <label>Blog Content:</label>
        <textarea
          rows="10"
          placeholder="write your blog content here."
          required
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        ></textarea>
        {/* <label>Article Author:</label> */}
        {/* <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
        {user ? (
          <button style={{ backgroundColor: "black" }}>Add a article</button>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                borderRadius: "2px",
                border: "1px solid #333",
                width: "fit-content",
                padding: "6px 12px",
              }}
            >
              Please login to write a blog.
            </p>
          </div>
        )}
        {/* {!isLoading && <button>Add a article</button>}
        {pleaseLogin && <p>Please login to create a blog.</p>}
        {isLoading && <button disabled>Adding article...</button>} */}
      </form>
    </div>
  );
}

export default CreateBlog;
