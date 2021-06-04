import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout, logInWithGoogle } from "../services/auth";

function Navbar({ user, logout, login }) {
  const [activePage, setActivePage] = useState(false);

  return (
    <div className="navbar" style={{ marginTop: "0px", padding: "5px" }}>
      <h1>JS</h1>

      <div className="navbar-links">
        {/* {user ? ( */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0px",
            // gap: "10px",
            // height: "40px",
          }}
        >
          <NavLink exact className="link" activeClassName="active" to="/">
            Home
          </NavLink>

          <NavLink className="link" activeClassName="active" to="/create">
            Write your blog
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/myblogs">
            My blogs
          </NavLink>

          {user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",

                alignItems: "center",
              }}
            >
              <button
                className="link"
                style={{
                  border: "0",
                  color: "#fff",
                  backgroundColor: "#f1356d",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() => logout()}
              >
                Logout
              </button>
              <div>
                <img
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    width: "30px",
                  }}
                  src={user.photoURL}
                  alt=""
                />
                <p style={{ color: "#fff", fontSize: "0.6rem" }}>
                  {user.displayName}
                </p>
              </div>
            </div>
          ) : (
            <button
              className="link"
              style={{
                border: "0",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => login()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
