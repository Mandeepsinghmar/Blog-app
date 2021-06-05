import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout, logInWithGoogle } from "../services/auth";
import "../index.css";

function Navbar({ user, logout, login }) {
  const [activePage, setActivePage] = useState(false);

  return (
    <div
      className="navbar"
      style={{ backgroundColor: "#eef0f1", marginTop: "0px", padding: "5px" }}
    >
      <h1 style={{ marginTop: "50px" }}>JS</h1>

      <div
        className="navbar-links"
        style={{
          display: "flex",
          // marginTop: "30px",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* <div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",

            gap: "20px",
          }}
        >
          <NavLink exact className="link" activeClassName="active" to="/">
            Home
          </NavLink>

          <NavLink className="link" activeClassName="active" to="/create">
            Write blog
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/myblogs">
            My blogs
          </NavLink>
        </div>

        {user ? (
          <div
            style={{
              marginTop: "0px",
            }}
          >
            <img
              style={{
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                cursor: "pointer",
              }}
              src={user.photoURL}
              alt=""
              onClick={() => logout()}
            />
            <p style={{ color: "#000", fontSize: "1.2rem" }}>
              {user.displayName}
            </p>
          </div>
        ) : (
          <div>
            <p
              className="login"
              style={{
                marginTop: "-10px",
                border: "0",
                color: "#fff",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "6px 12px",
                marginLeft: "-12px",
              }}
              onClick={() => login()}
            >
              Sign In
            </p>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Navbar;
