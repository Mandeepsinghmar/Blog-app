import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import useAllUsersBlogs from "../hooks/useAllUsersBlogs";
import Loader from "react-loader-spinner";
import { AiOutlineComment } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import BlogList from "./BlogList";

const AllUsersBlogs = () => {
  const id = useParams();
  const { docs } = useAllUsersBlogs(id);

  return (
    <div className="blogs">
      <BlogList docs={docs} heading="More blogs" />
    </div>
  );
};

export default AllUsersBlogs;
