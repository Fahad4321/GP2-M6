import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";
import { updateContentbyID } from "../../../APIRequest/contentAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CourseContentModal = ({ open, onCreate, onCancel, contents }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      videoTitle: contents?.videoTitle,
      videoUrl: contents?.videoUrl,
      serialNo: contents?.serialNo,
    });
  }, [contents]);

  return (
    <Modal
      open={open}
      title="Edit Course Content"
      okText={"Update"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            (async () => {
              const result = await updateContentbyID(contents._id, values);
              if (result) {
                onCreate();
                form.resetFields();
              }
            })();
          })
          .catch((info) => {});
      }}
    >
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
        <Form.Item
          name={"videoTitle"}
          label={"Video Title"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Video Title" />
        </Form.Item>
        <Form.Item
          name={"videoUrl"}
          label={"Video Url"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Video Url" />
        </Form.Item>

        <Form.Item
          name={"serialNo"}
          label={"Serial No"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Serial No" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseContentModal;
