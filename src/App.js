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
const App = () => {
  const [userExist, setUserExist] = useState(null);
  const [user, setUser] = useState(null);

  const loginBtnClick = async () => {
    const user = await logInWithGoogle();
    console.log(user);
    if (user) {
      db.collection("users").onSnapshot((snap) => {
        let userId = [];
        snap.forEach((doc) => {
          userId.push(doc.id);
        });

        let userExist = userId.includes(user.uid);
        console.log(userExist);
        setUserExist(userExist);
      });
      if (userExist) {
        db.collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            const User = doc.data();
            console.log(User);

            setUser(User);
            localStorage.setItem("user", JSON.stringify(User));
          });
      } else {
        const createdAt = timestamp();
        const loggedInUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
          createdAt,
        };
        db.collection("users").doc(user.uid).set(loggedInUser);
        // setUser(loggedInUser);
        // localStorage.setItem("user", JSON.stringify(loggedInUser));
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
    // return () => {};
  }, [auth.currentUser]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const logoutBtnClick = async () => {
    const logout_success = await logout();
    console.log(logout_success);
    if (logout_success) {
      setUser(!logout_success);
      localStorage.removeItem("user");
      console.log("logout");
    }
  };

  return (
    <Router>
      <div className="app" style={{ textAlign: "center" }}>
        <Navbar user={user} login={loginBtnClick} logout={logoutBtnClick} />
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
            <Route exact path="/myblogs">
              <MyBlogs user={user} />
            </Route>

            <Route exact path="/blog/:id">
              <BlogDetails user={user} />
              {/* <BlogDetails /> */}
            </Route>
            <Route exact path="/blogs/:id">
              <AllUsersBlogs />
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

        <Footer />
      </div>
    </Router>
  );
};

export default App;
