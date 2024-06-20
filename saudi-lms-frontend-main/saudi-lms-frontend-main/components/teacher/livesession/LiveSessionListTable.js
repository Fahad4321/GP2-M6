/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Select, Table, Space } from "antd";
import { getCoursesDropDownByTeacher } from "../../../APIRequest/courseAPIRequest";
import { getModulesDropDownByCourseTeacher } from "../../../APIRequest/courseModuleApiRequest";
import { getLiveSession } from "../../../APIRequest/liveSessionAPIRequest";
import moment from "moment/moment";

const SubmittedAssignment = () => {
  const [courses, setCourses] = useState();
  const [courseSelect, setCourseSelect] = useState("");
  const [moduleSelect, setModuleSelect] = useState("");
  const [moduleDropDown, setModuleDropDown] = useState([]);
  const [liveSession, setLiveSession] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const course = await getCoursesDropDownByTeacher();
      setCourses(course);
    })();
  }, []);

  useEffect(() => {
    if (courseSelect.length > 0) {
      (async () => {
        setLoading(true);
        const modulesData = await getModulesDropDownByCourseTeacher(
          courseSelect
        );
        setModuleDropDown(modulesData);
        const getLiveSessions = await getLiveSession(
          courseSelect,
          moduleSelect
        );
        setLiveSession(getLiveSessions);
        setLoading(false);
      })();
    }
  }, [courseSelect]);

  useEffect(() => {
    (async () => {
      if (moduleSelect) {
        setLoading(true);
        const getLiveSessions = await getLiveSession(
          courseSelect,
          moduleSelect
        );
        setLoading(false);
        setLiveSession(getLiveSessions);
      }
    })();
  }, [moduleSelect]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => <p>{record?.title}</p>,
    },

    {
      title: "Meeting Start",
      dataIndex: "startingAt",
      key: "startingAt",
      render: (startingAt) => <p>{moment(startingAt).format("LLL")}</p>,
    },
    {
      title: "Meeting End",
      dataIndex: "endingAt",
      key: "endingAt",
      render: (endingAt) => <p>{moment(endingAt).format("LLL")}</p>,
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "meetingUrl",
      render: (_, meetingUrl) => (
        <Space size="middle">
          <Button
            type=""
            target="_blank"
            href={meetingUrl?.meetingUrl}
            className="bg-[#140342] text-white hover:text-white flex items-center hover:bg-[#100729]"
          >
            {console.log("meetingUrl", meetingUrl)}
            <span>JOIN CLASS</span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        autoComplete="on"
        className="p-8"
      >
        <Form.Item
          name="courseId"
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
          name="courseModuleId"
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
            onChange={(e) => {
              setModuleSelect(e);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={moduleDropDown}
          />
        </Form.Item>
      </Form>

      <Table loading={loading} columns={columns} dataSource={liveSession} />
    </>
  );
};

export default SubmittedAssignment;
