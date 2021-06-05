import { useState, useEffect } from "react";
import { db } from "../firebase";

const useUserBlogs = async (postedBy) => {
  const [docs, setDocs] = useState([]);
  let documents = [];
  useEffect(() => {
    db.collection("documents")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          const userBlogsId = doc.data().postedBy;

          if (userBlogsId === "ZiAz6yDT3ENdOlBUsjF0IR7Qo3Q2") {
            documents.push({ ...doc.data(), id: doc.id });
            console.log(doc.data());
          }
        });
        setDocs(documents);
      });
    console.log(documents);
  });
  return { docs };
};

export default useUserBlogs;
