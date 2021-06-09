import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";
import { AiOutlineComment } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { db } from "../firebase";

function BlogList({ docs, heading, user }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);

  const filtered = (docs) => {
    return (
      docs &&
      docs.filter(
        (item) =>
          item.blogName.toLowerCase().includes(search) ||
          item.blogContent.toLowerCase().includes(search)
      )
    );
  };
  const filteredData = filtered(docs);
  useEffect(() => {
    db.collection("users").onSnapshot((snap) => {
      let docs = [];
      snap.forEach((doc) => {
        docs.push(doc.data());
      });
      setUsers(docs);
      console.log(docs, users);
    });
  }, []);
  console.log(users);
  return (
    <>
      <div
        className="blog-list"
        style={{
          marginLeft: "190px",
        }}
      >
        <div
          className="search-container"
          style={{
            display: "flex",
            margin: "10px",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
            {heading}
          </h1>
          <input
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "20px",
              border: "1px solid #e2e2e2",
              padding: "0px 12px",
              outline: "none",
              backgroundColor: "#eef0f1",
              marginRight: "10px",
              fontSize: "0.8rem",
            }}
            type="text"
            placeholder="search blogs"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        {filteredData ? (
          filteredData.map((blog) => (
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
                {users
                  ? users.map(
                      (user) =>
                        user.uid === blog.postedBy && (
                          <Link to={`/blogs/${blog.postedBy}`}>
                            <img
                              src={user.photoURL}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                              alt=""
                            />
                          </Link>
                        )
                    )
                  : ""}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {users
                    ? users.map(
                        (user) =>
                          user.uid === blog.postedBy && (
                            <Link to={`/blogs/${blog.postedBy}`}>
                              <p
                                className="author-name"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  textTransform: "lowercase",
                                }}
                              >
                                {user.displayName}
                              </p>
                            </Link>
                          )
                      )
                    : ""}

                  {blog.createdAt && (
                    <div style={{ fontSize: "5px", fontWeight: "600" }}>
                      <span style={{ fontSize: "0.6rem" }}>
                        {moment(blog.createdAt.toDate()).format("MMM D")}{" "}
                      </span>
                      <span style={{ fontSize: "0.6rem" }}>
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
    </>
  );
}

export default BlogList;
