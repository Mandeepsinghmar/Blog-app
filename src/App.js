import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyBlogs from "./components/MyBlogs";

import CreateBlog from "./components/CreateBlog/index.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import { logInWithGoogle, logout } from "./services/auth";

import EditBlog from "./components/EditBlog";

import AllUsersBlogs from "./components/AllUsersBlogs";
import Home from "./components/Home";
import { db, auth, timestamp } from "./firebase";
import EditProfile from "./components/EditProfile";
import MessageContainer from "./components/MessageContainer";
const App = () => {
  // const [userExist, setUserExist] = useState(null);
  const [user, setUser] = useState(null);

  const loginBtnClick = async () => {
    const user = await logInWithGoogle();
    console.log(user);
    if (user) {
      const userExist = await db.collection("users").doc(user.uid).get();

      if (userExist.data() !== undefined) {
        db.collection("users")
          .doc(user.uid)
          .update({ isOnline: true })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .onSnapshot((doc) => {
                const User = doc.data();
                console.log(User);
                setUser(User);
                localStorage.setItem("user", JSON.stringify(User));
              });
          });
      } else {
        const createdAt = timestamp();
        const loggedInUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
          createdAt,
          isOnline: true,
        };
        db.collection("users").doc(user.uid).set(loggedInUser);
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      }
    }
  };
  // console.log(userExist);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          const User = doc.data();
          console.log(User);

          setUser(User);
          localStorage.setItem("user", JSON.stringify(User));
        });
    }
    return () => {};
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const logoutBtnClick = async () => {
    const logout_success = await logout(user);
    console.log(logout_success);

    if (logout_success) {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("users");

      console.log("logout");
    }
  };

  return (
    <Router>
      <div className="app" style={{ textAlign: "center" }}>
        <Navbar user={user} login={loginBtnClick} />
        {/* <button onClick={logInBtnClick}>login</button> */}
        <div className="content">
          {/* {user && ( */}
          <Switch>
            <Route exact path="/">
              {/* <BlogList blogs={blogs} user={user} /> */}
              <Home user={user} />
            </Route>

            <Route exact path="/create">
              <CreateBlog user={user} />
            </Route>

            <Route exact path="/profile">
              <MyBlogs user={user} logout={logoutBtnClick} />
            </Route>

            <Route exact path="/chat">
              <MessageContainer user={user} />
            </Route>
            <Route exact path="/blog/:id">
              <BlogDetails user={user} />
              {/* <BlogDetails /> */}
            </Route>
            <Route exact path="/blogs/:id">
              <AllUsersBlogs loggedInUser={user} logout={logoutBtnClick} />
            </Route>

            <Route exact path="/edit/:id">
              <EditBlog user={user} setUser={setUser} />
            </Route>
            <Route exact path="/editprofile/:id">
              <EditProfile user={user} setUser={setUser} />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          {/* )} */}
        </div>

        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
