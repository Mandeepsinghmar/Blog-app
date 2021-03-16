import React from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import Loader from "react-loader-spinner";

export default function BlogDetails() {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  const history = useHistory();

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {error && <div>Error: {error}</div>}
      {isLoading && (
        <div style={{ minHeight: "50vh" }}>
          <Loader type="Oval" color="#f1356d" height={40} width={40} />
          Loading 🏀🥎
        </div>
      )}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Written by {blog.author}</p>
            <button onClick={handleDelete}>🎃</button>
          </div>

          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
}
