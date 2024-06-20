import React, { useState } from "react";
import { Card, Col, Collapse } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import CourseContentModal from "./modal/CourseContentModal.jsx";
import CourseModuleModal from "./modal/CourseModuleModal.jsx";
import { getCoursebyID } from "../../APIRequest/courseAPIRequest.js";
import VideoPlayerModal from "./modal/VideoPlayerModal.jsx";
const { Panel } = Collapse;

const CourseModuleContent = ({ setData, imgUrl, data }) => {
  const [openModule, setOpenModule] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [getContents, setGetContents] = useState({});
  const onChange = (key) => {
    // console.log(key);
  };
  const onCreate = (values) => {
    setOpenModule(false);
    setOpenContent(false);
    (async () => {
      const result = await getCoursebyID(data._id);
      setData(result);
    })();
  };
  const GenExtra = (contents) => {
    return (
      <span className={"d-flex justify-content-between"}>
        {contents.name}
        <span
          className="bg-primary-color text-white p-1 rounded"
          onClick={() => {
            setOpenModule(true);
            setGetContents(contents);
          }}
        >
          Update
        </span>
      </span>
    );
  };
  return (
    <>
      <CourseModuleModal
        open={openModule}
        onCreate={onCreate}
        onCancel={() => {
          setOpenModule(false);
        }}
        contents={getContents}
      />
      <CourseContentModal
        open={openContent}
        onCreate={onCreate}
        onCancel={() => {
          setOpenContent(false);
        }}
        contents={getContents}
      />
      <VideoPlayerModal
        open={openPlayer}
        onCreate={onCreate}
        onCancel={() => {
          setOpenPlayer(false);
          console.log("cancelled");
          setGetContents({});
        }}
        contents={getContents}
      />
      <Col span={10} offset={2}>
        <Card>
          <h4>Course Name: {data?.name}</h4>
          <img
            width={320}
            className="py-4"
            src={imgUrl}
            alt={"Preview Image"}
          />

          <h5 className="pb-3">Course Modules</h5>

          <Collapse
            style={{ width: "100%" }}
            defaultActiveKey={["1"]}
            onChange={onChange}
          >
            {data?.modules?.map((item) => (
              <Panel header={GenExtra(item)} key={item.moduleNo}>
                {item?.contents?.map((c) => (
                  <span
                    className={"d-flex justify-content-between py-2"}
                    key={c._id}
                  >
                    <span>{c.videoTitle}</span>
                    <span>
                      <span
                        onClick={() => {
                          setOpenPlayer(true);
                          setGetContents(c);
                        }}
                        className="d-inline-block me-4"
                        style={{ cursor: "pointer" }}
                      >
                        <EyeOutlined className="fs-5" />
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        className="bg-primary-color text-white p-1 rounded"
                        onClick={() => {
                          setOpenContent(true);
                          setGetContents(c);
                        }}
                      >
                        Update
                      </span>
                    </span>
                  </span>
                ))}
              </Panel>
            ))}
          </Collapse>
        </Card>
      </Col>
    </>
  );
};

export default CourseModuleContent;
