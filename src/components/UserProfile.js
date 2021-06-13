import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FaBirthdayCake } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import moment from "moment";

const UserProfile = ({ id, User }) => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    db.collection("users").onSnapshot((snap) => {
      snap.forEach((doc) => {
        const user = doc.data();
        if (user.uid === id) {
          setUser(doc.data());
        }
      });
    });
    return () => {
      console.log("cleaned up");
    };
  }, [id]);
  console.log(user, id);
  return (
    <div
      style={{
        // marginRight: "-400px",
        marginTop: "20px",
        // marginBottom: "100px",
        // border: "2px solid white",
      }}
    >
      {user && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <img
            src={user.photoURL}
            alt=""
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
          <p>{user.displayName}</p>
          <p>{user.bio}</p>

          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              {user.location && (
                <>
                  {" "}
                  <GoLocation />
                  <span style={{ fontSize: "0.9rem" }}>{user.location}</span>
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
          <a
            href={user.website}
            target="_blank"
            rel="noreferrer nofollow"
            style={{ textDecoration: "none", color: "blue" }}
          >
            {user.website && user.website.substr(8)}
          </a>
          <div>
            {" "}
            {user.work && (
              <>
                <strong>Work as</strong>
                <span> {user.work}</span>
              </>
            )}
          </div>
          {User && User.uid === user.uid && (
            <div>
              <button>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "800",
                  }}
                  to={`/editprofile/${user.uid}`}
                >
                  Edit profile
                </Link>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
