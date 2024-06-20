/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Card, Collapse } from "antd";
import CourseContentModal from "./modal/CourseContentModal";
import CourseModuleModal from "./modal/CourseModuleModal";
import { getCoursebyID } from "../../../APIRequest/courseAPIRequest.js";
const { Panel } = Collapse;

const CourseModuleContent = ({ setData, imgUrl, data }) => {
  const [openModule, setOpenModule] = useState(false);
  const [openContent, setOpenContent] = useState(false);
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
      <span className={"flex justify-between"}>
        {contents.name}
        <span
          className="bg-gray-300 p-1 rounded"
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

      <Card>
        <img width={320} className="py-4" src={imgUrl} alt={"Preview Image"} />

        <h5 className="pb-3">Course Modules</h5>

        <Collapse
          style={{ width: "100%" }}
          defaultActiveKey={["1"]}
          onChange={onChange}
        >
          {data?.modules?.map((item) => (
            <Panel header={GenExtra(item)} key={item.moduleNo}>
              {item?.contents?.map((c) => (
                <div className={"flex justify-between py-3"} key={c._id}>
                  <p>{c.videoTitle}</p>
                  <p>
                    <span
                      style={{ cursor: "pointer" }}
                      className="p-1 bg-gray-300 rounded d-block"
                      onClick={() => {
                        setOpenContent(true);
                        setGetContents(c);
                      }}
                    >
                      Update
                    </span>
                  </p>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </Card>
    </>
  );
};

export default CourseModuleContent;
