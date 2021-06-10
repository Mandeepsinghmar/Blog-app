import React, { useState, useEffect, Suspense, lazy } from "react";

import { Link, useParams } from "react-router-dom";
import useAllUsersBlogs from "../hooks/useAllUsersBlogs";
import { db } from "../firebase";
import { FaBirthdayCake } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import BlogList from "./BlogList";

import moment from "moment";

const AllUsersBlogs = ({ loggedInUser, logout }) => {
  const [user, setUser] = useState(null);
  const [joinedDate, setJoinedDate] = useState("");

  const id = useParams();
  const { docs } = useAllUsersBlogs(id);

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
  useEffect(() => {
    if (id.id) {
      db.collection("users")
        .doc(id.id)
        .onSnapshot((doc) => {
          const User = doc.data();
          console.log(User);

          setUser(User);
        });
    }
  }, []);

  // useEffect(() => {
  //   db.collection("users").onSnapshot((snap) => {
  //     snap.forEach((doc) => {
  //       const user = doc.data();
  //       console.log(id.id === user.uid, id.id, user.uid);
  //       if (user.uid === id) {
  //         setUser(doc.data());
  //         console.log(user);
  //       }
  //     });
  //   });
  // }, []);

  return (
    <div className="blogs">
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
            {loggedInUser && loggedInUser.uid === user.uid && (
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
            )}
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
        ""
      )}
    </div>
  );
};

export default AllUsersBlogs;
