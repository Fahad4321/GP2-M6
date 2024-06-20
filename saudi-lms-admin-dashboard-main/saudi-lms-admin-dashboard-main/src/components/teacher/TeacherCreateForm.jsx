import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input } from "antd";
import { registerTeacherRequest } from "../../APIRequest/teacherAPIRequest.js";
const { TextArea } = Input;

const TeacherCreateForm = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const registerTeacher = async (values) => {
    const { firstName, lastName, email, mobile, qualification, about } = values;
    if (!picture) {
      setError("picture is required");
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("qualification", qualification);
    formData.append("about", about);
    formData.append("picture", picture);
    setLoading(true);
    const result = await registerTeacherRequest(formData);
    setLoading(false);
    if (result) {
      navigate("/admin/teacher/list");
    }
  };
  const handleOnchange = (e) => {
    const file = e.target.files[0];
    setPicture(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card>
        <Form
          name="create-teacher"
          layout="vertical"
          onFinish={registerTeacher}
          style={{
            width: "600px",
          }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size='large' placeholder={"First Name"} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size='large' placeholder={"Last Name"} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input size='large' placeholder={"E-Mail"} />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: "Mobile number required",
              },
            ]}
          >
            <Input size='large' placeholder={"Mobile Number"} />
          </Form.Item>

          <Form.Item
            name="qualification"
            label="Qualification"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size='large' placeholder={"Qualification"} />
          </Form.Item>

          <Form.Item
            name="about"
            label="About"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea size='large' placeholder={"About"} />
          </Form.Item>
          <Form.Item name="picture" label="Teache Photo">
            <input name="picture" type="file" onChange={handleOnchange} />
            <p className="text-danger">{error}</p>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="py-2 shadow"
                width="200"
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              size='large'
              type="default"
              className="bg-primary-color text-white"
              loading={loading}
              htmlType="submit"
            >
              Registration
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default TeacherCreateForm;
