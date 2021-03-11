import React, { useContext, useState, useEffect } from "react";
import { BlogsContext } from "../BlogProvider";

function Blog() {
  const data = useContext(BlogsContext);
  const [blogs, setBlogs] = useState(data);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);

    setBlogs(newBlogs);
  };

  useEffect(() => {
    console.log("first render");
    console.log(blogs);
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <p>{blog.body}</p>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Blog;
