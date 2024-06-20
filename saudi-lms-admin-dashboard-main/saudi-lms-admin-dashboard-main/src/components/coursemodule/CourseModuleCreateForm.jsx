import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { getCoursesDropDown } from "../../APIRequest/courseAPIRequest.js";
import { createModuleRequest } from "../../APIRequest/moduleAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CourseModuleCreateForm = () => {
  const [form] = Form.useForm();
  const [coursesDropdown, setCourseDropdown] = useState([]);

  useEffect(() => {
    (async () => {
      const dropdown = await getCoursesDropDown();
      setCourseDropdown(dropdown);
    })();
  }, []);

  const onClickSubmit = (values) => {
    (async () => {
      await submitModuleCreate(values);
    })();
  };

  const submitModuleCreate = async (values) => {
    const result = await createModuleRequest(values);
    if (result) {
      form.resetFields();
    }
  };

  return (
    <Card>
      <Form
        form={form}
        name="create-module"
        layout="vertical"
        onFinish={onClickSubmit}
        style={{
          width: "600px",
        }}
        validateMessages={validateMessages}
      >

        <Form.Item
            name="courseId"
            label="Select a Course"
            rules={[
              {
                required: true,
              },
            ]}
        >
          <Select
              size='large'
              showSearch
              placeholder="Select a Course"
              optionFilterProp="children"
              filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={coursesDropdown}
          />
        </Form.Item>

        <Form.Item
          name={"title"}
          label="Module Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size='large' placeholder={"Create Name"} />
        </Form.Item>

        <Form.Item
          name={"moduleNo"}
          label="Module No"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber size='large' style={{width: '100%'}} min={0} placeholder={"Module No"} />
        </Form.Item>



        <Form.Item>
          <Button
              size='large'
            type="default"
            className="bg-primary-color text-white"
            htmlType="submit"
          >
            Create Course Module
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CourseModuleCreateForm;
