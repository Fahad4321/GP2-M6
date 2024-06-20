import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setPasswordRequest } from "../../APIRequest/authApi.js";
import { Button, Checkbox, Form, Input } from "antd";
import { jwtDecode } from "../../utils/jwtDecode.js";

const SetPasswordForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const decoded = jwtDecode(token);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    setIsSubmitting(true);
    setPasswordRequest(token, values).then((res) => {
      setIsSubmitting(false);
      if (res) {
        navigate("/");
      }
    });
  };

  const passwordValidator = [
    { required: true, message: "Please enter your password" },
    { max: 40, message: "Password cannot be more than 40 characters long" },

    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      message:
        "Password must contain at least 8 characters long, one uppercase letter, one lowercase letter, one digit and one special character",
    },
  ];
  return (
    <Form
      className="shadow-lg rounded p-4"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Password" name="password" rules={passwordValidator}>
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please enter confirm password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Confirm password do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      {decoded?.role === "subagent" ? (
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the{" "}
            <Link
              to="/terms-condition"
              className="text-decoration-underline"
              target="_blank"
            >
              agreement
            </Link>
          </Checkbox>
        </Form.Item>
      ) : (
        ""
      )}

      <Form.Item>
        <Button
          type="default"
          size="large"
          htmlType="submit"
          className="d-block w-100 bg-secondary-color text-white"
          loading={isSubmitting}
        >
          Set Password
        </Button>
      </Form.Item>
      <div>
        Do you have remember password?
        <Link to="/" className="text-primary-color fw-semibold">
          {" "}
          Login
        </Link>
      </div>
    </Form>
  );
};

export default SetPasswordForm;
