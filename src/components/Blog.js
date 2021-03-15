function Blog({ blogs, title }) {
  return (
    <div className="blog-list">
      <h1>{title}</h1>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <div>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </div>
          {/* <button onClick={() => handleDelete(blog.id)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
}

export default Blog;
