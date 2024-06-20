import React from "react";
import { useRouter } from "next/router";
import { removeSessions } from "../helper/sessionStorage";

const Logout = () => {
  const router = useRouter();

  React.useEffect(() => {
    removeSessions();
    router.push("/login");
  }, []);
};

export default Logout;
