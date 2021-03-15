import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Blog from "./components/Blog";
import Loader from "react-loader-spinner";
import useFetch from "./components/useFetch";

function App() {
  const { data: blogs, isLoading, error } = useFetch(
    "http://localhost:8000/blogs"
  );

  // const handleDelete = (id) => {
  //   const newBlogs = blogs.filter((blog) => blog.id !== id);

  //   setBlogs(newBlogs);
  // };

  return (
    <div className="app">
      <Navbar />

      <div className="content">
        {error && <div>{error}</div>}
        {isLoading && (
          <Loader
            style={{ minHeight: "50vh" }}
            type="Oval"
            color="#f1356d"
            height={40}
            width={40}
          />
        )}
        {blogs && (
          <Blog
            blogs={blogs}
            title={"All blogs!"}
            // handleDelete={handleDelete}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
