import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase";

import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import CommentInput from "./CommentInput";
import banner from "../img/banner.jpg";
import useFirestore from "../hooks/useFirestore";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const BlogDetails = ({ user }) => {
  const { id } = useParams();
  const { docs } = useFirestore("blogs");

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(false);
  const [readingTime, setReadingTime] = useState("");

  const history = useHistory();

  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          let data = doc.data();
          const wpm = 225;
          const text = doc.data().blogContent;
          const words = text.trim().split(/\s+/).length;
          const time = Math.ceil(words / wpm);
          setReadingTime(time);
          setBlog(data);
        }
      });
    });
  }, [id]);

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
        gap: "40px",

        // backgroundColor: "white",
      }}
    >
      {loading && (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="blue" height={370} width={30} />
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
              className="username-container"
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
                  justifyContent: "flex-start",
                  gap: "6px",
                  alignItems: "flex-start",
                  fontSize: "0.9rem",
                  flexDirection: "column",
                }}
              >
                <Link to={`blogs/${blog.postedBy}`}>
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
                </Link>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignitems: "center",
                  }}
                >
                  <Link
                    to={`blogs/${blog.postedBy}`}
                    style={{
                      textTransform: "lowercase",
                      textDecoration: "none",
                    }}
                  >
                    <p
                      className="author-name"
                      style={{
                        fontWeight: "bold",
                        marginTop: "-5px",
                        fontSize: "1.1rem",
                        marginLeft: "8px",
                      }}
                    >
                      {" "}
                      {blog.author}
                    </p>
                  </Link>
                  {blog.createdAt && (
                    <div
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                        fontWeight: "600",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ fontSize: "0.6rem" }}>
                        {moment(blog.createdAt.toDate()).format("MMM D")}
                        {"  "}
                      </span>
                      <span style={{ marginLeft: "3px", fontSize: "0.6rem" }}>
                        {" "}
                        • {readingTime} min Read
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {user
                ? blog.postedBy === user.uid && (
                    <div
                      className="edit-delete-blog"
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

                  fontSize: "30px",

                  paddingLeft: "20px",
                  fontWeight: "800",
                  paddingBottom: "10px",
                  // borderBottom: "1px solid #e2e2e2",
                }}
              >
                {blog.blogName}
              </h1>

              <p style={{ paddingLeft: "20px", padding: "10px" }}>
                {ReactHtmlParser(blog.blogContent)}
              </p>
            </div>

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

                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderTop: "1px solid #e2e2e2",
                      padding: "4px 20px",
                    }}
                  >
                    <Link
                      to={`blogs/${comment.userId}`}
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-start",
                        alignItems: "center",

                        padding: "4px 20px",
                        textDecoration: "none",
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
                          marginLeft: "-3px",
                        }}
                      >
                        {comment.displayName}
                      </p>
                    </Link>
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
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid #e2e2e2 ",
          width: "397px",
          paddingTop: "10px",
        }}
      >
        {blog && (
          <div>
            <Link
              to={`blogs/${blog.postedBy}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={blog.userPicture}
                alt=""
                style={{ borderRadius: "50%", border: "2px solid white" }}
              />
              <p style={{ fontWeight: "800" }}> {blog.author}</p>
              {user.bio && <p>{user.bio}</p>}
            </Link>
          </div>
        )}
        <p
          style={{ fontWeight: "600", marginTop: "30px", marginBottom: "20px" }}
        >
          Read more blogs
        </p>
        {docs ? (
          docs
            .sort(() => 0.5 - Math.random())
            .slice(3, 7)
            .map((blog) => (
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
                    {blog.blogName.slice(0, 50)}
                  </p>
                </Link>
              </div>
            ))
        ) : (
          <div style={{ minHeight: "50vh" }}>
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
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
