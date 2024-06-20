/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Row, Col } from "antd";
import { getCoursesDropDownByTeacher } from "../../../APIRequest/courseAPIRequest";
import { getModulesDropDownByCourseTeacher } from "../../../APIRequest/courseModuleApiRequest";
import { useRouter } from "next/router";
import { createSessionRequest } from "../../../APIRequest/liveSessionAPIRequest";

const LiveSessionCreateForm = () => {
  const [courses, setCourses] = useState();
  const [courseSelect, setCourseSelect] = useState("");
  const [moduleDropDown, setModuleDropDown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const course = await getCoursesDropDownByTeacher();
      setCourses(course);
    })();
  }, []);

  useEffect(() => {
    if (courseSelect.length > 0) {
      (async () => {
        const modulesData = await getModulesDropDownByCourseTeacher(
          courseSelect
        );
        setModuleDropDown(modulesData);
      })();
    }
  }, [courseSelect]);

  const onClickSubmit = (values) => {
    (async () => {
      setLoading(true);
      await liveSessionCreate(values);
      setLoading(false);
    })();
  };

  const liveSessionCreate = async (values) => {
    const {
      course,
      meetingUrl,
      description,
      module,
      endingAt,
      startingAt,
      title,
    } = values;

    if (!picture) {
      setError("picture is required");
    }
    const formData = {};
    formData.title = title;
    formData.description = description;
    formData.startingAt = startingAt;
    formData.endingAt = endingAt;
    formData.course = course;
    formData.module = module;
    formData.thumbnail = picture;
    formData.meetingUrl = meetingUrl;
    setLoading(true);

    const result = await createSessionRequest(formData);
    setLoading(false);
    if (result) {
      router.push("/dashboard/livesession/views");
    }
  };

  const onChangeStart = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeEnd = (date, dateString) => {
    console.log(date, dateString);
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
  const getCalendarContainer = (triggerNode) => {
    return triggerNode.parentNode;
  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onClickSubmit}
        autoComplete="on"
        className="p-8"
      >
        <Form.Item
          name={"course"}
          label="Select a course"
          rules={[
            {
              required: true,
              message: "Please select a course!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginRight: "10px",
          }}
        >
          <Select
            showSearch
            placeholder="Select a Course"
            optionFilterProp="children"
            onChange={(e) => {
              setCourseSelect(e);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={courses}
          />
        </Form.Item>

        <Form.Item
          name={"module"}
          label="Select a module"
          rules={[
            {
              required: true,
              message: "Please select a module!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Select
            showSearch
            placeholder="Select a Module"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={moduleDropDown}
          />
        </Form.Item>

        <Form.Item
          label="Live Session Title"
          name={"title"}
          rules={[
            {
              required: true,
              message: "Please provide a assignment name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Live Session Description" name={"description"}>
          <Input.TextArea />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Start Date"
              name="startingAt"
              rules={[
                {
                  required: true,
                  message: "Please provide a assignment name!",
                },
              ]}
            >
              <>
                <DatePicker
                  showTime={{ format: "hh:mm A", use12Hours: true }}
                  onChange={onChangeStart}
                />
              </>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="End Date"
              name="endingAt"
              rules={[
                {
                  required: true,
                  message: "Please provide a assignment name!",
                },
              ]}
            >
              <>
                <DatePicker
                  showTime={{ format: "hh:mm A", use12Hours: true }}
                  onChange={onChangeEnd}
                  getCalendarContainer={getCalendarContainer}
                  className="custom-datepicker"
                />
              </>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Meeting URL"
          name={"meetingUrl"}
          rules={[
            {
              required: true,
              message: "Please provide a assignment name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="thumbnail" label="Course Thubmnail">
          <Input type="file" onChange={handleOnchange} />
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
          <Button type="default" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LiveSessionCreateForm;
