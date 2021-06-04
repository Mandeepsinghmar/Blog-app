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
          documents.push({ ...doc.data(), id: doc.id });
        });

        setDocs(documents);
      });
  }, [collection]);
  return { docs, loading };
};

export default useFirestore;
