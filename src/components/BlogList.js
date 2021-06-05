import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";

function BlogList(user) {
  const { docs } = useFirestore("blogs");

  return (
    <div
      className="blog-list"
      style={{
        marginLeft: "200px",
        width: "600px",
      }}
    >
      {/* <input type="text" onChange={(e) => setSearchBlog(e.target.value)} /> */}
      <h1>Feeds - Read Javscript blogs</h1>

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
                <p style={{ fontSize: "0..7rem", textTransform: "lowercase" }}>
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
                    borderRadius: "10px",
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
        </div>
      )}
    </div>
  );
}

export default BlogList;
