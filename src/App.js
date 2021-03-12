import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Blog from "./components/Blog";
import BlogProvider from "./BlogProvider";

function App() {
  const [blogs, setBlogs] = useState(data);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);

    setBlogs(newBlogs);
  };

  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Blog blogs={blogs} handleDelete={handleDelete} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
