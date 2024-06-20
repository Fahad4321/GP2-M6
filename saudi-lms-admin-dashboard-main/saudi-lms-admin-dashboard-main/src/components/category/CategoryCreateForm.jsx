import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { createCategoryRequest } from "../../APIRequest/categoryAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CategoryCreateForm = () => {
  let navigate = useNavigate();

  const submitCategoryCreate = (values) => {
    (async () => {
      await onClickSubmit(values);
    })();
  };

  const onClickSubmit = async (values) => {
    const result = await createCategoryRequest(values);
    if (result) {
      navigate("/admin/category/list");
    }
  };

  return (
    <Card>
      <Form
        name="create-category"
        layout="vertical"
        onFinish={submitCategoryCreate}
        style={{
          width: "600px",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"name"}
          label="Course Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size='large' placeholder={"Create Category"} />
        </Form.Item>
        <Form.Item>
          <Button
            size='large'
            type="default"
            className="bg-primary-color text-white"
            htmlType="submit"
          >
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CategoryCreateForm;
