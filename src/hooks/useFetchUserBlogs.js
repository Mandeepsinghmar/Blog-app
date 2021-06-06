import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const useFetchUserBlogs = (user) => {
  const [docs, setDocs] = useState([]);
  console.log(user);
  useEffect(() => {
    if (user) {
      db.collection("blogs")
        .orderBy("createdAt", "desc")

        .onSnapshot((snapshot) => {
          let documents = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const wpm = 225;
            const text = doc.data().blogContent;
            const words = text.trim().split(/\s+/).length;
            const time = Math.ceil(words / wpm);
            if (data.postedBy === user.uid) {
              documents.push({ ...doc.data(), id: doc.id, readingTime: time });
            }
          });
          setDocs(documents);
        });
    }
  }, [user]);
  return { docs };
};

export default useFetchUserBlogs;
