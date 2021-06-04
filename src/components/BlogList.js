import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import Loader from "react-loader-spinner";

function BlogList(user) {
  const { docs } = useFirestore("blogs");

  return (
    <div className="blog-list">
      {/* <input type="text" onChange={(e) => setSearchBlog(e.target.value)} /> */}
      <h1>Feeds - Read Javscript blogs</h1>

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
                marginTop: "10px",
                textDecoration: "none",
              }}
            >
              <p
                style={{
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "33px",
                  color: "pink",
                }}
              >
                {blog.blogName}{" "}
              </p>
              <p>{blog.blogContent.slice(`0`, 200)}...</p>
            </Link>
            {/* {blog.likes && blog.likes.length} likes{" "} */}
            {blog.comments ? blog.comments.length : "0"} comments
          </div>
        ))
      ) : (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
          Loading 🏀🥎
        </div>
      )}
    </div>
  );
}

export default BlogList;
