import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState(null);
  const [searchBlogNames, setSearchBlogNames] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    db.collection(collection)
      .orderBy("createdAt", "desc")

      .onSnapshot((snapshot) => {
        let documents = [];
        let blogs = [];
        snapshot.forEach((doc) => {
          const wpm = 225;
          const text = doc.data().blogContent;
          const words = text.trim().split(/\s+/).length;
          const time = Math.ceil(words / wpm);

          documents.push({ ...doc.data(), id: doc.id, readingTime: time });
          blogs.push(doc.data().blogName);
        });
        setSearchBlogNames(blogs);
        setDocs(documents);
      });
  }, [collection]);
  return { docs, loading, searchBlogNames };
};

export default useFirestore;
