import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      await fetch(url, { signal: abortCont.signal })
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
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        });
    };
    fetchData();

    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
