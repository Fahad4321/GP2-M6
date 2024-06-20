import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import {
  getProfileRequest,
  updateProfileRequest,
} from "../../APIRequest/authApi";
import { sessionSetAuth } from "../../helpers/sessionHelper";

const ProfileForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    getProfileRequest().then((res) => {
      form.setFieldsValue({
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        email: res.user.email,
      });
    });
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    delete values.email;

    setIsSubmitting(true);
    updateProfileRequest(values).then((result) => {
      setIsSubmitting(false);
      if (result) {
        getProfileRequest().then((res) => {
          sessionSetAuth(res.user);
        });
      }
    });
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: "600px" }}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please enter your First Name!",
          },
        ]}
      >
        <Input size="large" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please enter your Last Name!",
          },
        ]}
      >
        <Input size="large" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input readOnly size="large" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="d-block w-100"
          loading={isSubmitting}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
