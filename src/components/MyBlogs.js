import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import Loader from "react-loader-spinner";

const MyBlogs = ({ user }) => {
  const { docs } = useFetchUserBlogs(user ? user : "");

  console.log(docs);
  return (
    <div style={{ minHeight: "70vh" }}>
      {user ? (
        <div className="blog-list">
          {docs.length === 0 ? (
            <div>
              <h1>You haven't write any blog.</h1>
              <Link to="/create">Click here to write your first blog</Link>
            </div>
          ) : (
            <h1>Your All blogs</h1>
          )}

          {docs ? (
            docs.map((blog) => (
              <div
                className="blog-preview"
                key={blog.id}
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
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
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <p>{blog.author}</p>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "black",
                      padding: "10px",
                      borderRadius: "33px",
                      color: "pink",
                      marginBottom: "15px",
                      marginTop: "15px",
                    }}
                  >
                    {blog.blogName}{" "}
                  </p>
                  <p>{blog.blogContent.slice(0, 250)}</p>
                </Link>
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
