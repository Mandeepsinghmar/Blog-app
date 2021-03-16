import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, logInBtnClick }) {
  return (
    <div className="navbar">
      <h1>JS</h1>

      <div className="navbar-links">
        <Link className="link" to="/">
          Home
        </Link>

        {user ? (
          <div>
            <Link
              className="link"
              style={{
                color: "#fff",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
              to="/create"
            >
              Write a post
            </Link>

            <Link
              className="link"
              style={{
                color: "#fff",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
              to="/"
            >
              Your articles
            </Link>

            <img
              style={{ borderRadius: "50%", height: "40px" }}
              src={user.photoURL}
              alt=""
            />
            <span style={{ fontSize: "0.8rem", marginLeft: "15px" }}>
              {user.displayName}
            </span>
          </div>
        ) : (
          <button
            className="link"
            style={{
              border: "0",
              color: "#fff",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={logInBtnClick}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
