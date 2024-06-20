import React from "react";
import ProfileForm from "../../components/auth/ProfileForm";
import title from "../../utils/title.js";
const ProfilePage = () => {
  title("Profile");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
