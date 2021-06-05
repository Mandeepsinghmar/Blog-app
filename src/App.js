import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyBlogs from "./components/MyBlogs";
import "./App.css";
import CreateBlog from "./components/CreateBlog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import { logInWithGoogle, logout } from "./services/auth";
// import { UserContextProvider } from "./contexts/user";
import { db, auth } from "./firebase";
import BlogList from "./components/BlogList";
import EditBlog from "./components/EditBlog";
import EditUserProfile from "./components/EditUserProfile";
const App = () => {
  const [user, setUser] = useState(null);
  const loginBtnClick = async () => {
    const data = await logInWithGoogle();

    if (data) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

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
      <div className="app">
        <Navbar user={user} login={loginBtnClick} logout={logoutBtnClick} />
        {/* <button onClick={logInBtnClick}>login</button> */}
        <div className="content">
          {/* {user && ( */}
          <Switch>
            <Route exact path="/">
              {/* <BlogList blogs={blogs} user={user} /> */}
              <BlogList user={user} />
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
            <Route exact path="/edit/:id">
              <EditBlog user={user} setUser={setUser} />
            </Route>
            <Route exact path="/editprofile/:id">
              <EditUserProfile user={user} />
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
