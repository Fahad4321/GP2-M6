import React, { useEffect } from "react";
import { Col, Row } from "antd";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import title from "../../utils/title.js";

const ForgotPasswordPage = () => {
  title("Forgot Password");
  return (
    <Row>
      <Col
        span={10}
        offset={8}
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div className="d-block w-100">
          <div className="text-center">
            <h1 className="">Your Email Address?</h1>
            <p className="lead">You will receive 6 digit verification code</p>
          </div>
          <ForgotPasswordForm />
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;
