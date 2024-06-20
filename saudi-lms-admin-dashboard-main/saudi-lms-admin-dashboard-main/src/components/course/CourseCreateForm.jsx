import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Button, Card, Form, Input, InputNumber, Select } from "antd";
import { createCourseRequest } from "../../APIRequest/courseAPIRequest.js";
import { getCategoriesDropDown } from "../../APIRequest/categoryAPIRequest.js";
import { getTeacherDropDown } from "../../APIRequest/teacherAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CourseCreateForm = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategory] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const onClickSubmit = (values) => {
    (async () => {
      await submitCourseCreate(values);
    })();
  };

  useEffect(() => {
    (async () => {
      const categoryData = await getCategoriesDropDown();
      const teacherData = await getTeacherDropDown();
      setCategory(categoryData);
      setTeachers(teacherData);
    })();
  }, []);

  const submitCourseCreate = async (values) => {
    const {
      benefit,
      categoryId,
      description,
      name,
      teacherId,
      status,

    } = values;

    if (!picture) {
      setError("picture is required");
    }
    const formData = {};
    formData.name = name;
    formData.description = description;
    formData.categoryId = categoryId;
    formData.teacherId = teacherId;
    formData.thumbnail = picture;
    formData.status = status;
    formData.benefit = benefit;
    setLoading(true);

    const result = await createCourseRequest(formData);
    setLoading(false);
    if (result) {
      navigate("/admin/course/list");
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

  const initialValues = {
    status: "draft",
    courseType: "paid",
  };

  return (
    <Card>
      <Form
        name="create-course"
        layout="vertical"
        onFinish={onClickSubmit}
        style={{
          width: "600px",
        }}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Form.Item
          name={"name"}
          label="Course Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size='large' placeholder={"Course Name"} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
              size='large'
            showSearch
            placeholder="Select a Category"
            optionFilterProp="children"
            // onChange={onChangeUniversity}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={categories}
          />
        </Form.Item>

        <Form.Item
          name={"description"}
          label="Course Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea size='large' placeholder={"Course Description"} />
        </Form.Item>

        <Form.Item
          name="benefit"
          label="Benefits"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select size='large' mode="tags" tokenSeparators={[","]} options={[]} />
        </Form.Item>

        <Form.Item
          name="teacherId"
          label="Teacher"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
              size='large'
            showSearch
            placeholder="Select a Teacher"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={teachers}
          />
        </Form.Item>

        <Form.Item name="thumbnail" label="Course Thubmnail">
          <Input size='large' type="file" onChange={handleOnchange} />
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

        <Form.Item name="status" label="Status">
          <Select
              size='large'
            placeholder="Course Status"
            options={[
              {
                value: "draft",
                label: "Draft",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "published",
                label: "Published",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
              size='large'
            type="default"
            className="bg-primary-color text-white"
            htmlType="submit"
          >
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CourseCreateForm;
