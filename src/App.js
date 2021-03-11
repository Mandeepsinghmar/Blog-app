import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Blog from "./components/Blog";
import BlogProvider from "./BlogProvider";

function App() {
  return (
    <div className="app">
      <BlogProvider>
        <Navbar />

        <div className="content">
          <Blog />
        </div>

        <Footer />
      </BlogProvider>
    </div>
  );
}

export default App;
