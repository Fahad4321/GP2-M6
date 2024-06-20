import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { passwordChangeRequest } from "../../APIRequest/authApi";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/state/auth-slice.js";

const UpdatePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setIsSubmitting(true);
    passwordChangeRequest(values).then((res) => {
      setIsSubmitting(false);
      if (res) {
        dispatch(logOut());
      }
    });
  };

  const passwordValidator = [
    { required: true, message: "Please enter new password" },
    { max: 40, message: "Password cannot be more than 40 characters long" },

    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      message:
        "Password must contain at least 8 characters long, one uppercase letter, one lowercase letter, one digit and one special character",
    },
  ];

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ width: "600px" }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Current Password"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Please enter your current password",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="d-block w-100"
          loading={isSubmitting}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePassword;
