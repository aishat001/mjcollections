import axios from "axios";
import { useEffect, useState } from "react";
import { publicRequest } from "../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(url);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;