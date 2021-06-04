import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, timestamp } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";
import useFirestore from "../hooks/useFirestore";

function EditBlog({ user }) {
  const { id } = useParams();
  console.log(id);

  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pleaseLogin, setPleaseLogin] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          // setLoading(false);
          // setBlog(doc.data());
          const data = doc.data();
          let blogName = data.blogName;
          let blogContent = data.blogContent;
          // console.log(blogName);
          setBlogName(blogName);
          setBlogContent(blogContent);
        } else {
          // setLoading(false);
        }
      });
    });
    // console.log(blog);
  }, []);
  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      const updatedAt = timestamp();
      const userPicture = user.photoURL;
      const author = user.displayName;
      const userId = user.uid;
      db.collection("blogs").doc(id).update({
        postedBy: userId,

        blogName,
        author,
        blogContent,
        updatedAt,
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
      <h1 style={{ marginBottom: "20px" }}>Edit your Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <TextareaAutosize
          className="blog-name"
          type="text"
          placeholder="Edit Your blog name here."
          required
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
        />

        <TextareaAutosize
          placeholder="Edit your blog content here."
          required
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        ></TextareaAutosize>
        {/* <label>Article Author:</label> */}
        {/* <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
        {user ? (
          <button style={{ backgroundColor: "black" }}>Save changes</button>
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

export default EditBlog;
