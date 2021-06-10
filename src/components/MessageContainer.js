import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Loader from "react-loader-spinner";

const MessageContainer = ({ user }) => {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (user) {
      db.collection("users").onSnapshot((snap) => {
        let users = [];
        snap.forEach((doc) => {
          const User = doc.data();
          if (User.uid !== user.uid) {
            users.push(doc.data());
          }
        });
        console.log(users);
        setUsers(users);
      });
    }

    return () => {
      console.log("cleaned up");
    };
  }, []);
  return (
    <div
      className="message-container"
      style={{ marginTop: "20px", marginLeft: "200px" }}
    >
      {user ? (
        <div>
          {users ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "5px",
              }}
            >
              {users.map((user) => (
                <div
                  id={user.uid}
                  style={{
                    width: "50px",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={user.photoURL}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        position: "relative",
                        border: "1px solid white",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        backgroundColor: user.isOnline ? "green" : "red",
                        borderRadius: "50%",
                        height: "8px",
                        width: "8px",

                        top: "28px",
                      }}
                    ></span>
                    <p
                      style={{
                        fontWeight: "800",
                        fontSize: "0.6rem",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                      }}
                    >
                      {user.displayName}
                    </p>
                  </div>
                  <div className="chat-container">
                    <div></div>
                    <div>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Loader type="Oval" color="blue" height={90} width={30} />
            </div>
          )}
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
            Please login to see your chat.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
