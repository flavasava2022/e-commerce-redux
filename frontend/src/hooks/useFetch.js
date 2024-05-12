import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL + url);

        setData(res.data.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
