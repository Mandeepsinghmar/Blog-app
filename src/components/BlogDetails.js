import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase";
import Likes from "./Likes";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import CommentInput from "./CommentInput";
import banner from "../img/banner.jpg";
import useFirestore from "../hooks/useFirestore";

const BlogDetails = ({ user }) => {
  const { id } = useParams();
  const { docs } = useFirestore("blogs");

  const [userLikedBlog, setUserLikedBlog] = useState(false);

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          let data = doc.data();
          setBlog(data);
        }
      });
    });
  }, [id]);

  // console.log(userBlogs);

  const deleteBlog = () => {
    db.collection("blogs").doc(id).delete();
    history.push("/");
  };
  // console.log(blog.bannerUrl);
  return (
    <div
      className="blog-details"
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginLeft: "190px",
        gap: "20px",
        flexWrap: "wrap",

        // backgroundColor: "white",
      }}
    >
      {loading && (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
        </div>
      )}

      <div
        className="blog-details-container"
        style={{
          width: "600px",
          borderLeft: "1px solid #e2e2e2",
          borderRight: "1px solid #e2e2e2",
          backgroundColor: "#eef0f1",
        }}
      >
        {blog ? (
          <>
            {/* <div>
              <div
                style={{
               
                }}
              > */}
            <div>
              {blog.bannerUrl ? (
                <img
                  src={blog.bannerUrl}
                  alt=""
                  style={{
                    height: "200px",
                    borderRadius: "6px",
                    width: "100%",
                  }}
                />
              ) : (
                <img
                  src={banner}
                  alt=""
                  style={{
                    height: "200px",
                    borderRadius: "6px",
                    width: "100%",
                  }}
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",

                // alignItems: "flex-start",
                fontSize: "0.9rem",
                // flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
                padding: "20px",
                borderBottom: "1px solid #e2e2e2",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    height: "80px",
                    marginTop: "-60px",
                    border: "1.5px solid white",
                  }}
                  src={blog.userPicture}
                  alt=""
                />
                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "-5px",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {blog.author}
                </p>
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
                        <button>
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: "800",
                            }}
                            to={`/edit/${id}`}
                          >
                            Edit
                          </Link>
                        </button>
                      </div>
                    </div>
                  )
                : ""}
            </div>

            <div
              style={{
                borderBottom: "1px solid #e2e2e2",
                display: "flex",
                flexDirection: "column",

                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: "-20px",

                width: "100%",
                padding: " 10px 0px 20px  ",
              }}
            >
              <h1
                style={{
                  // width: "100%",

                  fontSize: "48px",
                  lineHeight: "60px",
                  paddingLeft: "20px",
                  fontWeight: "800px",
                  paddingBottom: "10px",
                  // borderBottom: "1px solid #e2e2e2",
                }}
              >
                {blog.blogName}
              </h1>

              <p style={{ paddingLeft: "20px", padding: "10px" }}>
                {blog.blogContent}
              </p>
            </div>

            {/* <Likes
              blogId={blog.id}
              user={user}
              totalLikes={blog.likes.length}
              likedBlog={userLikedBlog}
            /> */}

            <div>
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
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderTop: "1px solid #e2e2e2",
                      padding: "4px 20px",
                    }}
                  >
                    <img
                      src={comment.photoUrl}
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        marginLeft: "-5px",
                      }}
                    >
                      {comment.displayName}
                    </p>
                    <p style={{ fontSize: "0.8rem", marginLeft: "-5px" }}>
                      {comment.comment}
                    </p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div style={{ minHeight: "50vh" }}>
            <Loader type="Oval" color="#f1356d" height={40} width={40} />
          </div>
        )}
      </div>

      <div>
        {blog && (
          <div>
            <img
              src={blog.userPicture}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <p> {blog.author}</p>
          </div>
        )}
        <p
          style={{ fontWeight: "600", marginTop: "30px", marginBottom: "20px" }}
        >
          Read more blogs
        </p>
        {docs
          ? docs.slice(0, 4).map((blog) => (
              <div>
                <Link
                  className="suggested-blog"
                  to={`/blog/${blog.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    marginBottom: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "800",

                      padding: "3px 0px",
                      border: "1px solid #e2e2e2 ",
                      width: "100%",
                    }}
                  >
                    {blog.blogName}{" "}
                  </p>
                </Link>
              </div>
            ))
          : ""}
        {/* {userBlogs
          ? userBlogs.map((blog) => {
              // console.log(blog.blogName)
              <Link>
                <p>{blog.blogName}</p>
              </Link>;
            })
          : "no blogs"} */}
      </div>
    </div>
  );
};
export default BlogDetails;
