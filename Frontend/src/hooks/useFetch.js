import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api(url, options);
        if (isMounted) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
          toast.error(err.response?.data?.message || 'Error fetching data');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};
