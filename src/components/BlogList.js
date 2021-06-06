import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

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
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textDecoration: "none",
              padding: "6px 12px 0px 12px",
              gap: "5px",
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
                <img
                  src={blog.userPicture}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
              </Link>{" "}
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
                      ({moment(blog.createdAt.toDate()).startOf("ss").fromNow()}
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
                <p
                  className="blog-name"
                  style={{
                    borderRadius: "10px",
                    fontSize: "1.3rem",
                    fontWeight: "800",

                    padding: "3px 0px",
                  }}
                >
                  {blog.blogName.slice(0, 100)}
                </p>
                <p>{ReactHtmlParser(blog.blogContent.slice(0, 120))}...</p>
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
          </div>
        ))
      ) : (
        <div>
          <Loader type="Oval" color="blue" height={370} width={30} />
        </div>
      )}
    </div>
  );
}

export default BlogList;
