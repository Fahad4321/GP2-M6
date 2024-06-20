import React from "react";
import SetPasswordForm from "../../components/auth/SetPasswordForm.jsx";
import title from "../../utils/title.js";
import FormResponsiveWrap from "../../components/shared/FormResponsiveWrap.jsx";

const SetPasswordPage = () => {
  title("Set Your Password");
  return (
    <>
      <FormResponsiveWrap>
        <div className="d-block w-100">
          <h3 className="text-center bg-secondary-color text-white py-3">
            Set A New Password
          </h3>
          <SetPasswordForm />
        </div>
      </FormResponsiveWrap>
    </>
  );
};

export default SetPasswordPage;
