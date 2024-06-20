import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoriesDropDown } from "../../APIRequest/categoryAPIRequest.js";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { getTeacherDropDown } from "../../APIRequest/teacherAPIRequest.js";
import {
  getCoursebyID,
  updateCoursebyID,
} from "../../APIRequest/courseAPIRequest.js";
import CourseModuleContent from "./CourseModuleContent.jsx";

const validateMessages = {
  required: "${label} is required!",
};
const CourseUpdateForm = () => {
  const navigate = useNavigate();
  let [ObjectID, SetObjectID] = useState(0);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const onClickSubmit = (values, others) => {
    (async () => {
      await submitCourseUpdate(values);
    })();
  };
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);

      (async () => {
        const categoryData = await getCategoriesDropDown();
        const teacherData = await getTeacherDropDown();
        setCategory(categoryData);
        setTeachers(teacherData);
        const result = await getCoursebyID(id);
        setData(result);
        setPreviewUrl(result?.thumbnail?.secure_url || previewUrl);
      })();
    }
  }, []);

  const submitCourseUpdate = async (values) => {
    const result = await updateCoursebyID(ObjectID, {
      ...values,
      thumbnail: picture || previewUrl,
    });
    if (result) {
      navigate("/admin/course/list");
    }
  };

  if (Object.keys(data).length === 0) {
    return <div>Loading form data...</div>;
  }
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
    <Row>
      <Col span={12}>
        <Card>
          <Form
            name="update-course"
            layout="vertical"
            onFinish={onClickSubmit}
            style={{
              width: "600px",
            }}
            validateMessages={validateMessages}
            initialValues={data}
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
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
                Update Course
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <CourseModuleContent setData={setData} imgUrl={previewUrl} data={data} />
    </Row>
  );
};
export default CourseUpdateForm;
