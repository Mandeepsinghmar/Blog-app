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
      style={{ marginTop: "20px",padding:"15px", marginLeft: "200px" }}
    >
      {user ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
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

                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: user.isOnline ? "green" : "blue",
                        borderRadius: "50%",
                        height: "6px",
                        width: "6px",
                      }}
                    ></div>

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
                </div>
              ))}
              {/* <div className="chat-input-container"> */}
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button>send</button>
              </div>
              {/* </div> */}
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
