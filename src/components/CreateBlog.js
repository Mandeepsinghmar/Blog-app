import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, author, body };

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsLoading(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new article</h2>
      <form onSubmit={handleSubmit}>
        <label>Article title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Article Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Article Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {!isLoading && <button>Add a article</button>}
        {isLoading && <button disabled>Adding article...</button>}
      </form>
    </div>
  );
}

export default CreateBlog;
