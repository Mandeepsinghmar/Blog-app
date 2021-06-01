import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout, logInWithGoogle } from "../services/auth";

function Navbar({ user, logout, login }) {
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
          <Link className="link" to="/" style={{ color: "#fff" }}>
            Home
          </Link>

          <Link
            className="link"
            style={{
              color: "#fff",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
            }}
            to="/create"
          >
            Write your blog
          </Link>
          <Link
            className="link"
            style={{
              color: "#fff",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
            }}
            to="/yourblogs"
          >
            Your blogs
          </Link>

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
