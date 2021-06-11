import React, { useEffect, useState, useRef } from "react";
import { db, timestamp } from "../firebase";
import Loader from "react-loader-spinner";

const MessageContainer = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chattingStarted, setChattingStarted] = useState(false);
  const [chattingUserName, setChattingUserName] = useState("");
  const [chattingUserImage, setChattingUserImage] = useState("");
  const [chattingUserIsOnline, setChattingUserIsOnline] = useState(null);
  const [chattingUserId, setChattingUserId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [User, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const loggedInUser = user;

  // useEffect(() => {

  // }, [message]);

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

        setUsers(users);
      });
    }
  }, []);

  const initializeChat = (user) => {
    setUser(user);
    setChattingStarted(true);
    setChattingUserName(user.displayName);
    setChattingUserImage(user.photoURL);
    setChattingUserIsOnline(user.isOnline);
    setChattingUserId(user.uid);

    // db.collection("conversations")
    //   .where("loggedInUserId", "in", [loggedInUser.uid, chattingUserId])
    //   .orderBy("createdAt", "asc")
    //   .onSnapshot((snap) => {
    //     const documents = [];
    //     snap.forEach((doc) => {
    //       console.log(doc.data());
    //       let data = doc.data();
    //       console.log(data.loggedInUserId, data.chattingUserId);
    //       if (
    //         (data.loggedInUserId === loggedInUser.uid &&
    //           data.chattingUserId === chattingUserId) ||
    //         (data.loggedInUserId === chattingUserId &&
    //           data.chattingUserId === loggedInUser.uid)
    //       ) {
    //         documents.push(doc.data());
    //       }
    //     });
    //     setConversations(documents);
    //     console.log(documents);
    //   });
  };
  useEffect(() => {
    if (loggedInUser) {
      db.collection("conversations")
        .where("loggedInUserId", "in", [loggedInUser.uid, chattingUserId])
        .orderBy("createdAt", "asc")
        .onSnapshot((snap) => {
          const documents = [];
          snap.forEach((doc) => {
            let data = doc.data();

            if (
              (data.loggedInUserId === loggedInUser.uid &&
                data.chattingUserId === chattingUserId) ||
              (data.loggedInUserId === chattingUserId &&
                data.chattingUserId === loggedInUser.uid)
            ) {
              documents.push(doc.data());
            }
          });
          setConversations(documents);
          console.log(documents);
        });
    }
  }, [User]);

  const submitMessage = () => {
    const createdAt = timestamp();
    const msg = {
      createdAt,
      message,
      loggedInUserId: loggedInUser.uid,
      chattingUserId,
    };

    if (message !== "") {
      db.collection("conversations").add(msg);
      setMessage("");
    }
  };

  return (
    <div
      className="message-container"
      style={{
        padding: "15px",
        marginLeft: "200px",
        // display: "flex",
        // flexDirection: "column",
        marginBottom: "80px",
      }}
    >
      {user ? (
        <div
          style={
            {
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "flex-start",
              // alignItems: "flex-start",
            }
          }
          // style={{ marginBottom: "40px" }}
        >
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
                  key={user.uid}
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
                    key={user.uid}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <img
                        onClick={() => initializeChat(user)}
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
                    </div>

                    <div>
                      <p
                        onClick={() => initializeChat(user)}
                        style={{
                          fontWeight: "800",
                          fontSize: "0.6rem",
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                        }}
                      >
                        {user.displayName}
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          backgroundColor: user.isOnline ? "green" : "blue",
                          borderRadius: "50%",
                          height: "6px",
                          width: "6px",
                          top: "12px",
                          // left: "200px",
                        }}
                      ></p>
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
          {/* chatting with */}
          <div style={{ marginTop: "10px" }}>
            {chattingStarted ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    backgroundColor: chattingUserIsOnline ? "green" : "blue",
                    borderRadius: "50%",
                    height: "8px",
                    width: "8px",

                    marginBottom: "25px",
                    left: "21px",
                    zIndex: "100",
                  }}
                ></p>

                <img
                  src={chattingUserImage}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    position: "relative",
                    border: "1px solid white",
                  }}
                />

                <p style={{ fontWeight: "600", textTransform: "capitalize" }}>
                  {chattingUserName}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* message section */}
          {chattingStarted
            ? conversations.map((conversation) => (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign:
                      conversation.loggedInUserId === loggedInUser.uid
                        ? "right"
                        : "left",
                  }}
                  ref={messagesEndRef}
                >
                  <p
                    style={{
                      backgroundColor:
                        conversation.loggedInUserId === loggedInUser.uid
                          ? "white"
                          : "skyblue",
                      display: "inline-block",
                      margin: "5px",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      maxWidth: "80%",
                    }}
                  >
                    {conversation.message}
                  </p>
                </div>
              ))
            : null}

          {/* chating input */}
          {chattingStarted ? (
            <div className="chat-input-wrapper" style={{ display: "flex" }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ flex: "8" }}
              />
              <button onClick={submitMessage} style={{ flex: "4" }}>
                send
              </button>
            </div>
          ) : null}
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
