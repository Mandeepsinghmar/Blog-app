import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../index.css";
import { AiFillHome } from "react-icons/ai";
import { ImRocket } from "react-icons/im";
import { RiZcoolFill } from "react-icons/ri";

function Navbar({ user, logout, login }) {
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "#eef0f1",
        marginTop: "0px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "100px",
      }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <h1
          style={{
            marginTop: "30px",

            height: "50px",
            width: "50px",
            fontSize: "1.5rem",
          }}
        >
          JS
        </h1>
      </div>

      <div
        className="navbar-links"
        style={{
          display: "flex",

          flexDirection: "column",
        }}
      >
        {/* <div> */}
        <div
          className="navbar_items"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: "-300px",
            gap: "20px",
          }}
        >
          <NavLink exact className="link" activeClassName="active" to="/">
            <p>
              <AiFillHome className="nav-icon" />
            </p>
            <p className="icon-name">Home</p>
          </NavLink>

          <NavLink className="link" activeClassName="active" to="/create">
            <p>
              <ImRocket className="nav-icon" />
            </p>
            <p className="icon-name">Write</p>
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/myblogs">
            <p>
              <RiZcoolFill className="nav-icon" />
            </p>
            <p className="icon-name">Profile</p>
          </NavLink>
        </div>

        {user ? (
          <>
            <div
              className="profile-container"
              style={{
                marginTop: "20px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  height: "80px",
                  width: "80px",
                  cursor: "pointer",
                  border: "2px solid white",
                }}
                src={user.photoURL}
                alt=""
                onClick={() => logout()}
              />
              <p
                style={{
                  color: "#000",
                  fontSize: "1.2rem",
                  textTransform: "lowercase",
                  fontWeight: "800",
                }}
              >
                {user.displayName}
              </p>
            </div>
          </>
        ) : (
          <div>
            <p
              className="login"
              style={{
                marginTop: "15px",
                border: "0",
                color: "#fff",
                backgroundColor: "#000",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "6px ",
                fontSize: "1rem",
              }}
              onClick={() => login()}
            >
              Log In
            </p>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Navbar;
