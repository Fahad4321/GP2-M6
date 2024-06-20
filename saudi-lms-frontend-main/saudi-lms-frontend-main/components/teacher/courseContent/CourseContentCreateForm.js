import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  Image,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  createContentRequest,
  uploadContentResource,
} from "../../../APIRequest/contentAPIRequest.js";
import { getCoursesDropDownByTeacher } from "../../../APIRequest/courseAPIRequest.js";
import { getModulesDropDownByCourseTeacher } from "../../../APIRequest/courseModuleApiRequest.js";

const validateMessages = {
  required: "${label} is required!",
};

const CourseContentCreateForm = () => {
  const [courseDropDown, setCourseDropDown] = useState([]);
  const [courseSelect, setCourseSelect] = useState("");
  const [moduleDropDown, setModuleDropDown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("Lesson");
  const [previewImage, setPreviewImage] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const course = await getCoursesDropDownByTeacher();
      setCourseDropDown(course);
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

  const onClickSubmit = async (values) => {
    try {
      if (contentType === "Resource") {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("resources", file[0].originFileObj);
        });
        const urls = await uploadContentResource(formData);
        values.contents.forEach((content, index) => {
          content.videoUrl = urls[index].secure_url;
        });
        values.contentType = contentType;
        await createContentRequest(values);
      } else {
        values.contentType = contentType;
        await createContentRequest(values);
      }
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = (index, { fileList }) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = fileList;
    setSelectedFiles(newSelectedFiles);
  };

  const uploadButton = (index) => (
    <div className="align-items-center">
      <i className="fa fa-plus"></i> Upload
    </div>
  );

  return (
    <Card>
      <Form
        name="create-content"
        form={form}
        layout="vertical"
        onFinish={onClickSubmit}
        style={{
          width: "600px",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="courseId"
          label="Course"
          rules={[
            {
              required: true,
            },
          ]}
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
            showSearch
            placeholder="Select a Module"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={moduleDropDown}
          />
        </Form.Item>
        <Form.Item name="contentType" label="Content type">
          <Select
            placeholder="Choose a type"
            defaultValue={contentType}
            value={contentType}
            onChange={(value) => setContentType(value)}
            options={[
              { label: "Lesson", value: "Lesson" },
              { label: "Resource", value: "Resource" },
            ]}
          />
        </Form.Item>

        <Form.List name="contents">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
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
                    <InputNumber min={1} placeholder="Lession Serial" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "videoTitle"]}
                    label={"Content Title"}
                    rules={[
                      {
                        required: true,
                        message: "Missing video title",
                      },
                    ]}
                  >
                    <Input placeholder="Content Title" />
                  </Form.Item>
                  {contentType === "Resource" ? (
                    <Form.Item
                      {...restField}
                      name={[name, "videoUrl"]}
                      label={"Upload file"}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Missing video url",
                      //   },
                      // ]}
                    >
                      {/* file upload input  */}
                      <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        onPreview={handlePreview}
                        onChange={(fileList) => handleChange(index, fileList)}
                      >
                        {selectedFiles[index] && selectedFiles[index].length > 0
                          ? null
                          : uploadButton(index)}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{ display: "none" }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(""),
                          }}
                          src={previewImage}
                          alt="Preview image"
                        />
                      )}
                    </Form.Item>
                  ) : (
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
                      <Input placeholder="Video url" />
                    </Form.Item>
                  )}
                  <MinusCircleOutlined
                    className={"fs-5"}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {contentType === "Lesson" ? "Add lesson" : "Add Resource"}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button loading={loading} type="default" htmlType="submit">
            Create Content
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CourseContentCreateForm;
