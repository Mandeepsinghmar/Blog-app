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
  const { docs, loading } = useFetchUserBlogs(user ? user : "");

  console.log(docs);
  const joinedDate = new Date(
    user.createdAt.seconds * 1000
  ).toLocaleDateString();
  console.log(joinedDate);
  return (
    <div
      className="user-blogs"
      style={{ minHeight: "70vh", overflow: "hidden" }}
    >
      {loading && (
        <div>
          <Loader type="Oval" color="blue" height={370} width={30} />
        </div>
      )}
      {user ? (
        <div className="blog-list">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="profile"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "190px",
                zIndex: "1000000",
                gap: "5px",
              }}
            >
              <img
                src={user.photoURL}
                style={{
                  borderRadius: "3px",
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
                alt=""
              />
              <p
                style={{
                  fontWeight: "800",
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                }}
              >
                {user.displayName}
              </p>
              <p>{user.bio}</p>

              <div>
                <p>{user.location}</p>
                {/* {user.createdAt && ( */}
                {/* <p>joined on {user.createdAt}</p> */}
                {/* {moment(user.createdAt.toDate()).format("MMM D")} */}
                {console.log(user.createdAt)}
                {/* )} */}
              </div>
              <div>
                {" "}
                <a href={user.website} target="_blank">
                  {user.website}
                </a>
              </div>
              <div>{user.work}</div>
              <div>{user.skills}</div>
            </div>
            <div>
              <button>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "800",
                    padding: "6px 12px",
                    backgroundColor: "f7",
                  }}
                  to={`/editprofile/${user.uid}`}
                >
                  Edit profile
                </Link>
              </button>
            </div>
          </div>

          <div
            style={{
              // display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              marginTop: "20px",
            }}
          >
            <BlogList docs={docs} heading="" />
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
