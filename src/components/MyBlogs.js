import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import Loader from "react-loader-spinner";

const MyBlogs = ({ user }) => {
  const { docs } = useFetchUserBlogs(user ? user : "");

  console.log(docs);
  return (
    <div style={{ minHeight: "70vh", marginLeft: "200px" }}>
      {user ? (
        <div className="blog-list">
          {docs.length === 0 ? (
            <div>
              <h1>You haven't write any blog.</h1>
              <Link to="/create">Click here to write your first blog</Link>
            </div>
          ) : (
            <h1 style={{ marginLeft: "-400px" }}>Your All blogs</h1>
          )}

          {docs ? (
            docs.map((blog) => (
              <div
                className="blog-preview"
                key={blog.id}
                style={{
                  marginTop: "20px",

                  border: "1px solid #e2e2e2",
                  width: "600px",
                  padding: "6px 12px 0px 12px",
                  gap: "5px",
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    key={blog.id}
                  >
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
                    <p
                      style={{
                        fontSize: "0..7rem",
                        textTransform: "lowercase",
                      }}
                    >
                      {blog.author}
                    </p>
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
                    <p
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "800",

                        padding: "3px 0px",
                      }}
                    >
                      {blog.blogName}{" "}
                    </p>
                    <p>{blog.blogContent.slice(`0`, 200)}...</p>
                    <div style={{ padding: "3px 0px" }}>
                      {" "}
                      {blog.comments ? blog.comments.length : "0"} comments
                    </div>
                  </div>
                </Link>
                {/* {blog.likes && blog.likes.length} likes{" "} */}
              </div>
            ))
          ) : (
            <div style={{ minHeight: "50vh" }}>
              <Loader type="Oval" color="#f1356d" height={40} width={40} />
              Loading 🏀🥎
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
            }}
          >
            Please login to see your blogs.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
