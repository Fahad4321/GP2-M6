import React from "react";
import { Col, Row } from "antd";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import title from "../../utils/title.js";
const NewPasswordPage = () => {
  title("Create a new password");
  return (
    <Row>
      <Col
        span={10}
        offset={8}
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div>
          <h1 className="text-center"> Create a new password</h1>
          <NewPasswordForm />
        </div>
      </Col>
    </Row>
  );
};

export default NewPasswordPage;
