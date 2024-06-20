/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Radio,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  Comment,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createCourseRequest } from "../../../APIRequest/courseAPIRequest";
import { getCategoriesDropDown } from "../../../APIRequest/categoryAPIRequest.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const validateMessages = {
  required: "${label} is required!",
};
const CourseCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);

  const onClickSubmit = (values) => {
    (async () => {
      setLoading(true);
      await submitCourseCreate(values);
      setLoading(false);
    })();
  };

  useEffect(() => {
    (async () => {
      const categoryData = await getCategoriesDropDown();
      console.log(categoryData);
      setCategory(categoryData);
    })();
  }, []);

  const submitCourseCreate = async (values) => {
    const {
      benefit,
      categoryId,
      description,
      name,
      regularPrice,
      sellPrice,
      teacherId,
      status,
      courseType,
    } = values;

    if (!picture) {
      setError("picture is required");
    }
    const formData = {};
    formData.name = name;
    formData.description = description;
    formData.categoryId = categoryId;
    formData.regularPrice = regularPrice;
    formData.sellPrice = sellPrice;
    formData.teacherId = currentUser?._id;
    formData.thumbnail = picture;
    formData.status = status;
    formData.courseType = courseType;
    formData.benefit = benefit;
    setLoading(true);

    const result = await createCourseRequest(formData);
    setLoading(false);
    if (result) {
      router.push("/dashboard/courses");
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
              (option?.label ?? "")
                ?.toLowerCase()
                ?.includes(input?.toLowerCase())
            }
            options={category}
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
                value: "published",
                label: "Published",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button size='large' loading={loading} type="default" htmlType="submit">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CourseCreateForm;
