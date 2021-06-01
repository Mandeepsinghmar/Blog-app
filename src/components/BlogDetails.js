import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase";

import Loader from "react-loader-spinner";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection("blogs").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          setLoading(false);
          setBlog(doc.data());
        } else {
          setLoading(false);
        }
      });
    });
  }, []);

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
            <span
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
            </span>
            <h1 style={{ fontSize: "2.5rem" }}>{blog.blogName}</h1>

            <h2>{blog.blogContent}</h2>
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
