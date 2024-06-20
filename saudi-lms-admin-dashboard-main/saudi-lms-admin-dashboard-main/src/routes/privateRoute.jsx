import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axiosInstance from "../utils/axiosInstance.js";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axiosInstance.get(`/auth/admin-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (token) authCheck();
  }, [token]);

  return ok ? children : <Loading />;
};

export default PrivateRoute;
