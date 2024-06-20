import React from "react";
import { Col, Row } from "antd";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm";
import title from "../../utils/title.js";
const VerifyOtpPage = () => {
  title("OTP Verify");

  return (
    <Row>
      <Col
        span={10}
        offset={8}
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div>
          <h1 className="text-center"> OTP Code Verification</h1>
          <p className="lead text-center">
            Verification code has been sent to your email address.
          </p>
          <VerifyOtpForm />
        </div>
      </Col>
    </Row>
  );
};

export default VerifyOtpPage;
