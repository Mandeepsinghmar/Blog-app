import React from "react";
import useFirestore from "../hooks/useFirestore";
import BlogList from "./BlogList";

const Home = ({ user }) => {
  const { docs } = useFirestore("blogs");
  return (
    <div className="home-blogs">
      <BlogList docs={docs} user={user} heading="Feeds - read JS blogs" />
    </div>
  );
};

export default Home;
