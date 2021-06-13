import React, { useEffect, useState } from "react";
import { db, timestamp } from "../firebase";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";

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

  const loggedInUser = user;

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
        localStorage.setItem("users", JSON.stringify(users));
      });
    }
  }, []);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      setUsers(users);
    }
  }, []);

  const initializeChat = (user) => {
    setUser(user);
    setChattingStarted(true);
    setChattingUserName(user.displayName);
    setChattingUserImage(user.photoURL);
    setChattingUserIsOnline(user.isOnline);
    setChattingUserId(user.uid);
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

  const submitMessage = async (e) => {
    e.preventDefault();
    const createdAt = timestamp();
    const msg = {
      createdAt,
      message,
      loggedInUserId: loggedInUser.uid,
      chattingUserId,
    };

    await db.collection("conversations").add(msg);

    setMessage("");
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {user ? (
        <div className="message-container" style={{ marginLeft: "190px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "10px",
              justifyContent: "flex-start",
            }}
          >
            <h1> All profiles</h1>
          </div>
          {users ? (
            <div
              className="all-users"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",

                borderTop: "1px solid #e2e2e2",
                borderBottom: "1px solid #e2e2e2",
                marginLeft: "7px",
              }}
            >
              {users.map((user) => (
                <>
                  <div
                    key={user.uid}
                    style={{
                      display: "flex",
                      flexDirection: "column",

                      justifyContent: "flex-start",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "50px",
                      margin: "3px",
                    }}
                  >
                    <img
                      onClick={() => initializeChat(user)}
                      src={user.photoURL}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        position: "relative",
                        border: user.isOnline
                          ? "2px solid green"
                          : "2px solid #C0C0C0",
                      }}
                    />

                    <p
                      onClick={() => initializeChat(user)}
                      style={{
                        fontWeight: "800",
                        fontSize: "0.6rem",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.displayName}
                    </p>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div>
              <Loader type="Oval" color="blue" height={90} width={30} />
            </div>
          )}
          {/* chatting with */}
          <div
            style={{
              paddingTop: "8px",
              borderBottom: chattingStarted ? "1px solid #e2e2e2" : "",
              paddingBottom: "8px",
            }}
          >
            {chattingStarted ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginLeft: "10px",
                }}
              >
                <Link to={`/blogs/${chattingUserId}`}>
                  <img
                    src={chattingUserImage}
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",

                      border: chattingUserIsOnline
                        ? "2px solid #90EE90"
                        : "2px solid #C0C0C0",
                    }}
                  />
                </Link>
                <Link
                  to={`/blogs/${chattingUserId}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "800",
                        fontSize: "0.8rem",

                        textTransform: "capitalize",
                      }}
                    >
                      {chattingUserName}
                    </p>
                    <p style={{ fontSize: "0.6rem" }}>
                      {chattingUserIsOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* message section */}
          <>
            {chattingStarted ? (
              <ScrollableFeed>
                <main className="main" style={{ marginTop: "10px" }}>
                  {conversations.map((conversation) => (
                    <>
                      <div
                        className={`message ${
                          conversation.loggedInUserId === loggedInUser.uid
                            ? "sent"
                            : "received"
                        } `}
                      >
                        <Link
                          to={
                            conversation.loggedInUserId === loggedInUser.uid
                              ? `/blogs/${loggedInUser.uid}`
                              : `/blogs/${chattingUserId}`
                          }
                        >
                          <img
                            src={
                              conversation.loggedInUserId === loggedInUser.uid
                                ? loggedInUser.photoURL
                                : chattingUserImage
                            }
                            alt=""
                          />
                        </Link>
                        {/* {console.log(conversation.createdAt} */}
                        <p className="msg">{conversation.message}</p>
                      </div>
                    </>
                  ))}
                </main>
              </ScrollableFeed>
            ) : (
              <div>
                <h1>Choose any profile to chat!</h1>
              </div>
            )}

            {/* chating input */}
            {chattingStarted ? (
              <div className="msg-form-container">
                <form className="msg-form" onSubmit={submitMessage}>
                  <textarea
                    className="input"
                    placeholder="Type a message"
                    type="text"
                    value={message}
                    style={{ overflow: "hidden" }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button disabled={!message} type="submit">
                    🚀
                  </button>
                </form>
              </div>
            ) : null}
          </>
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
    </>
  );
};

export default MessageContainer;
