import React, { Suspense, useState, lazy } from "react";

import { Link } from "react-router-dom";
import useFetchUserBlogs from "../hooks/useFetchUserBlogs";
import Loader from "react-loader-spinner";
import { FaBirthdayCake } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";

import moment from "moment";
import { logout } from "../services/auth";
// import BlogList from "./BlogList";
const BlogList = lazy(() => import("./BlogList"));

const MyBlogs = ({ user, logout }) => {
  const { docs, loading } = useFetchUserBlogs(user ? user : "");
  const [joinedDate, setJoinedDate] = useState("");

  const fetchDate = () => {
    if (user) {
      if (user.createdAt !== null) {
        setTimeout(() => {
          const date = new Date(
            user.createdAt.seconds * 1000
          ).toLocaleDateString();
          setJoinedDate(date);
        }, 1000);
      }
    }
  };
  fetchDate();

  // console.log(joinedDate);

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
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            className="profile__container"
          >
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

              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  {user.location && (
                    <>
                      {" "}
                      <GoLocation />
                      <span style={{ fontSize: "0.9rem" }}>
                        {user.location}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {/* {date ? <p>{date}</p> : ""} */}
                  {joinedDate ? (
                    <>
                      <FaBirthdayCake />{" "}
                      <span style={{ fontSize: "0.9rem" }}>
                        Joined on{" "}
                        {joinedDate && moment(joinedDate).format("MMM D, YYYY")}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                {" "}
                {user.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer nofollow"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {user.website.substr(8)}
                  </a>
                ) : (
                  ""
                )}
              </div>
              <div>
                {" "}
                {user.work && (
                  <>
                    <strong>Work as</strong>
                    <span> {user.work}</span>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "800",
                  padding: "6px 12px",
                  backgroundColor: "#f9f871",
                  border: "1px solid #e2e2e2",
                  borderRadius: "10px",
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={`/editprofile/${user.uid}`}
                >
                  Edit profile
                </Link>
              </button>
              <p
                style={{
                  marginLeft: "20px",
                  // marginTop: "10px",
                  cursor: "pointer",
                  border: "1px solid #e2e2e2",
                  padding: "8px ",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
                onClick={() => logout()}
              >
                <AiOutlineLogout />
              </p>
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
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList docs={docs} heading="" />
            </Suspense>
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
