import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import Loader from "react-loader-spinner";
import { AiOutlineComment } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const MyBlogs = ({ user }) => {
  const { docs } = useFetchUserBlogs(user ? user : "");

  console.log(docs);
  return (
    <div
      className="user-blogs"
      style={{ minHeight: "70vh", overflow: "hidden", marginLeft: "190px" }}
    >
      {user ? (
        <div className="blog-list">
          <div>
            <img
              src={user.photoURL}
              style={{ borderRadius: "3px", height: "90px", width: "90px" }}
              alt=""
            />
            <p style={{ fontWeight: "600" }}>{user.displayName}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginLeft: "30px",
            }}
          >
            {docs.length === 0 ? (
              <div>
                <h1>You haven't write any blog.</h1>
                <Link to="/create">Click here to write your first blog</Link>
              </div>
            ) : (
              ""
            )}
          </div>

          {docs ? (
            docs.map((blog) => (
              <div
                className="blog-preview"
                key={blog.id}
                style={{
                  marginTop: "20px",

                  borderTop: "1px solid #e2e2e2",

                  padding: "6px 12px 0px 12px",
                  gap: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  key={blog.id}
                >
                  <Link to={`blogs/${blog.postedBy}`}>
                    {" "}
                    <img
                      src={blog.userPicture}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    {" "}
                    <Link to={`blogs/${blog.postedBy}`}>
                      <p
                        className="author-name"
                        style={{
                          fontSize: "17px",
                          fontWeight: "600",
                          textTransform: "lowercase",
                        }}
                      >
                        {blog.author}
                      </p>
                    </Link>
                    {blog.createdAt && (
                      <div style={{ fontSize: "10px", fontWeight: "600" }}>
                        <span>
                          {moment(blog.createdAt.toDate()).format("MMM D")}{" "}
                        </span>
                        <span>
                          (
                          {moment(blog.createdAt.toDate())
                            .startOf("ss")
                            .fromNow()}
                          )
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingLeft: "30px",
                    marginTop: "5px",
                  }}
                >
                  <Link
                    className="active-link"
                    to={`/blog/${blog.id}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textDecoration: "none",
                    }}
                  >
                    <p
                      className="blog-name"
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "800",

                        padding: "3px 0px",
                      }}
                    >
                      {blog.blogName}{" "}
                    </p>
                    <p>
                      {ReactHtmlParser(blog.blogContent.slice(`0`, 200))}...
                    </p>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "3px 0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{blog.comments ? blog.comments.length : "0"} </span>
                      <span style={{ paddingTop: "4px" }}>
                        {" "}
                        <AiOutlineComment />
                      </span>
                    </div>
                    {/* <div
                    style={{
                      padding: "3px 0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span> {blog.likes ? blog.likes.length : "0"} </span>
                    <span style={{ paddingTop: "6px" }}>
                      {" "}
                      <AiOutlineHeart />
                    </span>
                  </div> */}
                    <div>
                      <p style={{ fontSize: "10px" }}>
                        {blog.readingTime} min Read
                      </p>
                    </div>
                  </div>
                </div>

                {/* {blog.likes && blog.likes.length} likes{" "} */}
              </div>
            ))
          ) : (
            <div style={{ minHeight: "50vh" }}>
              <Loader type="Oval" color="blue" height={370} width={30} />
            </div>
          )}
        </div>
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
              backgroundColor: "#c7ffa2",
              marginTop: "150px",
            }}
          >
            Please login to see your profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
