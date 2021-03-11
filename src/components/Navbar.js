import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <h1>JS</h1>

      <div>
        <a href="/">Home</a>
        <a
          style={{
            color: "#fff",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
          href="/"
        >
          Write a post
        </a>
        <a
          style={{
            color: "#fff",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
          href="/"
        >
          New blog
        </a>
      </div>
    </div>
  );
}

export default Navbar;
