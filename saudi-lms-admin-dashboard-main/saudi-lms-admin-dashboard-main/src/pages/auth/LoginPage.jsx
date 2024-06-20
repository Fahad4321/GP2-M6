import React, { useEffect } from "react";
import LoginForm from "./../../components/auth/LoginForm";
import { Col, Row } from "antd";
import title from "../../utils/title.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  title("Login");
  const { currentUser } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/admin/dashboard");
    }
  }, [currentUser]);

  return (
    <>
      <Row>
        <Col
          span={10}
          offset={8}
          className="d-flex justify-content-center align-items-center vh-100"
        >
          <div className="d-block w-100">
            <h3 className="text-center bg-info text-white py-3">Admin Login</h3>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
