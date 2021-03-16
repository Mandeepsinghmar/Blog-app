import React from "react";
import Loader from "react-loader-spinner";
import useFetch from "./useFetch";
import BlogList from "./BlogList";

function Blog() {
  const { data: blogs, isLoading, error } = useFetch(
    "http://localhost:8000/blogs"
  );

  return (
    <div className="content">
      {error && <div>Error: {error}</div>}
      {isLoading && (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
          Loading 🏀🥎
        </div>
      )}
      {blogs && (
        <BlogList
          blogs={blogs}
          title={"All blogs!"}
          // handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Blog;
