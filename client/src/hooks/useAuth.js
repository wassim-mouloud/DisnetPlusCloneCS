import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const resp = await httpClient.get("/api/auth/@me", {
          withCredentials: true,
        });
        if (resp.status === 200) {
          setUser(resp.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  return { user, isLoading };
}

export default useAuth;
