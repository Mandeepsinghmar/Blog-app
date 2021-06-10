import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const UserProfile = ({ id, User }) => {
  const [user, setUser] = useState(null);
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
          <a href={user.website} target="_blank" rel="noreferrer nofollow">
            {user.website.substr(8)}
          </a>
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
