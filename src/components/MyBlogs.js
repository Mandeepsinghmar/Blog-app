import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import Loader from "react-loader-spinner";
import { AiOutlineComment } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import BlogList from "./BlogList";

const MyBlogs = ({ user }) => {
  const { docs } = useFetchUserBlogs(user ? user : "");

  console.log(docs);
  return (
    <div
      className="user-blogs"
      style={{ minHeight: "70vh", overflow: "hidden" }}
    >
      {user ? (
        <div className="blog-list">
          <div
            className="profile"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "240px",
            }}
          >
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
            <div>
              <BlogList docs={docs} heading="Your own blogs!" />
            </div>
          </div>
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
