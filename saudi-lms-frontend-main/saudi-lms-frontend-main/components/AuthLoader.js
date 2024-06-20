/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "antd";
const AuthLoader = ({ path = "" }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      /*navigate(`/${path}`, {
            state: location.pathname,
        });*/
      router.push("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white!important",
        height: "100vh",
        width: "100%",
        position: "absolute",
        left: "0px!important",
      }}
    >
      <Skeleton active style={{ width: "700px" }} />
    </div>
  );
};

export default AuthLoader;
