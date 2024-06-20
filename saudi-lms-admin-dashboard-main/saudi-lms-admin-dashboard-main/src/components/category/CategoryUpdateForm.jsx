import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCategoryRequest,
  getCategoriesDropDown,
  getCategorybyID,
  updateCategorybyID,
} from "../../APIRequest/categoryAPIRequest.js";
import { Button, Card, Form, Input } from "antd";
import { getTeacherDropDown } from "../../APIRequest/teacherAPIRequest.js";
import { getCoursebyID } from "../../APIRequest/courseAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CategoryUpdateForm = () => {
  let navigate = useNavigate();
  let [ObjectID, SetObjectID] = useState(0);
  const [data, setData] = useState({});
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);

      (async () => {
        const result = await getCategorybyID(id);
        setData(result);
      })();
    }
  }, []);

  const onClickSubmit = (values) => {
    (async () => {
      await submitCategoryUpdate(values);
    })();
  };
  const submitCategoryUpdate = async (values) => {
    const result = await updateCategorybyID(ObjectID, values);
    if (result) {
      navigate("/admin/category/list");
    }
  };
  if (Object.keys(data).length === 0) {
    return <div>Loading form data...</div>;
  }

  return (
    <Card>
      <Form
        name="update-category"
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
          label="Course Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Update Category"} />
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            className="bg-primary-color text-white"
            htmlType="submit"
          >
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CategoryUpdateForm;
