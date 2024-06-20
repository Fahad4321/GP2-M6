import React, { useEffect } from "react";
import UpdatePassword from "../../components/auth/UpdatePassword";
import title from "../../utils/title.js";

const UpdatePasswordPage = () => {
  title("Change Password");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <UpdatePassword />
    </div>
  );
};

export default UpdatePasswordPage;
