import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for this.");
          }

          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
