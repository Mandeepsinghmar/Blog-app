import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    db.collection(collection)
      .orderBy("createdAt", "desc")

      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          const wpm = 225;
          const text = doc.data().blogContent;
          const words = text.trim().split(/\s+/).length;
          const time = Math.ceil(words / wpm);
          documents.push({ ...doc.data(), id: doc.id, readingTime: time });
        });

        setDocs(documents);
      });
  }, [collection]);
  return { docs, loading };
};

export default useFirestore;
