/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Head from "next/head";
import * as React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
} from "antd";
import CourseModuleContent from "../../../../components/teacher/course/CourseModuleContent";
import { useEffect, useState } from "react";
import {
  getCoursebyID,
  updateCoursebyID,
} from "../../../../APIRequest/courseAPIRequest";
import { getCategoriesDropDown } from "../../../../APIRequest/categoryAPIRequest";
import { useSelector } from "react-redux";
import withAuth from "../../../../middleware/withAuth";

const UpdateCoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { currentUser } = useSelector((state) => state.auth);

  let [ObjectID, SetObjectID] = useState(0);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const validateMessages = {
    required: "${label} is required!",
  };

  const onClickSubmit = (values, others) => {
    (async () => {
      await submitCourseUpdate(values);
    })();
  };

  useEffect(() => {
    if (courseId !== null) {
      SetObjectID(courseId);

      (async () => {
        const categoryData = await getCategoriesDropDown();
        setCategory(categoryData);
        const result = await getCoursebyID(courseId);
        setData(result);
        setPreviewUrl(result?.thumbnail?.secure_url || previewUrl);
      })();
    }
  }, []);

  const submitCourseUpdate = async (values) => {
    values.teacherId = currentUser?._id;

    const result = await updateCoursebyID(ObjectID, {
      ...values,
      thumbnail: picture || previewUrl,
    });
    if (result) {
      await router.push("/dashboard/courses");
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
    <>
      <Head>
        <title>Dashboard | My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="p-4" gutter={20}>
        <Col span={14}>
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
                  // onChange={onChangeUniversity}
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
                  className="bg-green-700 text-white hover:text-white"
                  htmlType="submit"
                >
                  Update Course
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={10}>
          <CourseModuleContent
            setData={setData}
            imgUrl={previewUrl}
            data={data}
          />
        </Col>
      </Row>
    </>
  );
};

export default withAuth(UpdateCoursePage);
