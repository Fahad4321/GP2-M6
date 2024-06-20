import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendOtpRequest, verifyEmailRequest } from "../../APIRequest/authApi";

const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function formatter(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "");
  }

  const onFinish = (values) => {
    setIsSubmitting(true);
    const email = localStorage.getItem("email");
    verifyEmailRequest(email, values.otp).then((res) => {
      setIsSubmitting(false);
      if (res) {
        localStorage.setItem("otp", values.otp);
        navigate(location.state?.path);
      }
    });
  };

  const resendOtpHandle = () => {
    const email = localStorage.getItem("email");
    sendOtpRequest(email).then((res) => {});
  };

  return (
    <Form
      className="shadow-sm rounded p-4"
      name="basic"
      layout="horizontal"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="otp"
        rules={[
          {
            required: true,
            message: "Please provide otp code",
          },
        ]}
        className="p-0 m-0"
      >
        <InputNumber
          style={{ width: "100%" }}
          maxLength={6}
          step={1}
          precision={0}
          formatter={formatter}
          size="large"
        />
      </Form.Item>

      <Button onClick={resendOtpHandle} className="my-2">
        Resend OTP
      </Button>

      <Form.Item>
        <Button
          type="default"
          htmlType="submit"
          className="d-block w-100 bg-info text-white"
          loading={isSubmitting}
        >
          Confirm
        </Button>
      </Form.Item>
      <div>
        Can you remember your password ?
        <Link to="/" className="">
          {" "}
          Login
        </Link>
      </div>
    </Form>
  );
};

export default VerifyOtpForm;
