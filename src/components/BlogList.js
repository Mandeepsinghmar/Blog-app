import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";

function BlogList(user) {
  const { docs } = useFirestore("blogs");

  return (
    <div
      className="blog-list"
      style={{
        marginLeft: "190px",
      }}
    >
      {/* <input type="text" onChange={(e) => setSearchBlog(e.target.value)} /> */}
      <h1 style={{ marginBottom: "20px" }}>Feeds - Read Javscript blogs</h1>

      {docs ? (
        docs.map((blog) => (
          <div
            className="blog-preview"
            key={blog.id}
            style={{
              borderTop: "1px solid #e2e2e2",

              padding: "6px 12px 0px 12px",
              gap: "5px",
            }}
          >
            <Link
              className="blog-preview"
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
                    fontWeight: "600",
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
                  className="blog-name"
                  style={{
                    borderRadius: "10px",
                    fontSize: "1.3rem",
                    fontWeight: "800",

                    padding: "3px 0px",
                  }}
                >
                  {blog.blogName}{" "}
                </p>
                <p>{blog.blogContent.slice(`0`, 200)}...</p>
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
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div style={{ minHeight: "80vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
        </div>
      )}
    </div>
  );
}

export default BlogList;
