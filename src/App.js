import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import CreateBlog from "./components/CreateBlog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import { logInWithGoogle, logout } from "./services/auth";
// import { UserContextProvider } from "./contexts/user";

function App() {
  const [user, setUser] = useState(null);
  const [logout, setLogout] = useState();

  const logInBtnClick = async () => {
    let userByLogIn = await logInWithGoogle();
    if (userByLogIn) setUser(userByLogIn);
  };

  const logOutBtnClick = async () => {
    let logout_success = await logout();
    if (logout_success) setLogout(!logout_success);
  };
  return (
    <Router>
      <div className="app">
        <Navbar
          logout={logout}
          user={user}
          logOutBtnClick={logOutBtnClick}
          logInBtnClick={logInBtnClick}
        />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Blog />
            </Route>
            <Route path="/create">
              <CreateBlog />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
