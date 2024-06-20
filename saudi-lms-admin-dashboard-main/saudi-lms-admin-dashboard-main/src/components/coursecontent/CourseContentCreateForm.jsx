import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createContentRequest } from "../../APIRequest/contentAPIRequest.js";
import { getTeacherDropDown } from "../../APIRequest/teacherAPIRequest.js";
import { getCoursesDropDown } from "../../APIRequest/courseAPIRequest.js";
import { getModulesDropDown } from "../../APIRequest/moduleAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CourseContentCreateForm = () => {
  const [form] = Form.useForm();
  const [courseDropDown, setCourseDropDown] = useState([]);
  const [courseSelect, setCourseSelect] = useState("");
  const [moduleDropDown, setModuleDropDown] = useState([]);

  useEffect(() => {
    (async () => {
      const courseData = await getCoursesDropDown();
      await getTeacherDropDown();
      setCourseDropDown(courseData);
    })();
  }, []);

  useEffect(() => {
    if (courseSelect.length > 0) {
      (async () => {
        const modulesData = await getModulesDropDown(courseSelect);
        setModuleDropDown(modulesData);
      })();
    }
  }, [courseSelect]);

  const onClickSubmit = (values) => {
    (async () => {
      await submitCourseCreate(values);
    })();
  };

  const submitCourseCreate = async (values) => {
    const result = await createContentRequest(values);
    if (result) {
      form.resetFields();
    }
  };

  return (
    <Card>
      <Form
        form={form}
        name="create-content"
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
            onChange={(e) => {
              setCourseSelect(e);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={courseDropDown}
          />
        </Form.Item>

        <Form.Item
          name="moduleId"
          label="Module"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            size='large'
            showSearch
            placeholder="Select a Module"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={moduleDropDown}
          />
        </Form.Item>

        <Form.List name="contents">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "block",
                    marginBottom: 8,
                    backgroundColor: "rgb(227, 227, 227)",
                    padding: "15px",
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "serialNo"]}
                    label={"Serial No"}
                    rules={[
                      {
                        required: true,
                        message: "Missing Lesson Serial",
                      },
                    ]}
                  >
                    <InputNumber size='large' min={1} placeholder="Lession Serial" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "videoTitle"]}
                    label={"Video Title"}
                    rules={[
                      {
                        required: true,
                        message: "Missing video title",
                      },
                    ]}
                  >
                    <Input size='large' placeholder="Video Title" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "videoUrl"]}
                    label={"Video Url"}
                    rules={[
                      {
                        required: true,
                        message: "Missing video url",
                      },
                    ]}
                  >
                    <Input size='large' placeholder="Video url" />
                  </Form.Item>
                  <MinusCircleOutlined
                    className={"fs-5"}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  size='large'
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add lesson
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            size='large'
            type="default"
            className="bg-primary-color text-white"
            htmlType="submit"
          >
            Create Content
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CourseContentCreateForm;
