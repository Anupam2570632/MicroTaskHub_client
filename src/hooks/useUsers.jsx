import { useEffect, useState } from "react";
import axios from "axios";

const useUsers = (email) => {
  const [serverUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user?email=${email}`);
        setUser(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  return { serverUser, loading, error };
};

export default useUsers;
