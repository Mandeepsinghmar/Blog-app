import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const useFetchUserBlogs = (user) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("blogs")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          let documents = [];
          snapshot.forEach((doc) => {
            const data = doc.data();

            if (data.postedBy === user.uid) {
              documents.push({ ...doc.data(), id: doc.id });

              // console.log(docs);
            }
          });
          setDocs(documents);
        });
    }
  }, [user]);
  return { docs };
};

export default useFetchUserBlogs;
