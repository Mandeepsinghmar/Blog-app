import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase";
import Likes from "./Likes";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import CommentInput from "./CommentInput";

const BlogDetails = ({ user }) => {
  const { id } = useParams();

  const [userLikedBlog, setUserLikedBlog] = useState(false);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          setLoading(false);
          setBlog(doc.data());
          console.log(blog);
        } else {
          setLoading(false);
        }
      });
    });
  }, []);
  console.log(blog);

  const deleteBlog = () => {
    db.collection("blogs").doc(id).delete();
    history.push("/");
  };

  return (
    <div className="blog-details" style={{ minHeight: "60vh" }}>
      {/* {error && <div>Error: {error}</div>}
      {isLoading && (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
          Loading 🏀🥎
        </div>
      )} */}

      {loading && <p>loading..</p>}
      {blog ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",

                alignItems: "flex-start",
                fontSize: "0.9rem",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  alignItems: "center",
                  fontSize: "0.9rem",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                  }}
                  src={blog.userPicture}
                  alt=""
                />
                <p> {blog.author}</p>
              </div>
              {user
                ? blog.postedBy === user.uid && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <button onClick={() => deleteBlog()}>Delete</button>
                      </div>
                      <div>
                        <Link to={`/edit/${id}`}>Edit</Link>
                      </div>
                    </div>
                  )
                : ""}
            </div>
            <h1 style={{ fontSize: "2.5rem" }}>{blog.blogName}</h1>

            <h2>{blog.blogContent}</h2>
            {blog.likes && (
              <Likes
                blogId={blog.id}
                user={user}
                totalLikes={blog.likes.length}
                likedBlog={userLikedBlog}
              />
            )}
            <CommentInput
              blog={blog}
              user={user}
              comments={blog.comments}
              id={id}
            />
            {blog.comments ? (
              blog.comments.map((comment) => (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={comment.photoUrl}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <p style={{ fontWeight: "bold", marginLeft: "-5px" }}>
                    {comment.displayName}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          <div>
            <img src={blog.userPicture} alt="" />
            <p> {blog.author}</p>
          </div>
        </div>
      ) : (
        <p>loading..</p>
      )}
    </div>
  );
};
export default BlogDetails;
