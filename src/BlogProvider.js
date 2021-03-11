import React, { createContext } from "react";

export const BlogsContext = createContext();

function BlogProvider(props) {
  const data = [
    { title: "hello world1", id: 1, body: "lorem sfsljfldsf" },
    { title: "hello world2", id: 2, body: "lorem sfsljfldsf" },
    { title: "hello world3", id: 3, body: "lorem sfsljfldsf" },
  ];

  return (
    <BlogsContext.Provider value={data}>{props.children}</BlogsContext.Provider>
  );
}

export default BlogProvider;
