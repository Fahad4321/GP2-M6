import { Form, Input, InputNumber, Modal, Space } from "antd";
import React, { useEffect } from "react";
import { updateModulebyID } from "../../../APIRequest/moduleAPIRequest.js";

const validateMessages = {
  required: "${label} is required!",
};
const CourseModuleModal = ({ open, onCreate, onCancel, contents }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: contents?.name,
      moduleNo: contents?.moduleNo,
    });
  }, [contents]);

  return (
    <Modal
      open={open}
      title="Edit Course Module"
      okText={"Update"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            (async () => {
              const result = await updateModulebyID(contents._id, values);
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
          name={"title"}
          label={"Module Title"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Module Name" />
        </Form.Item>
        <Form.Item
          name={"moduleNo"}
          label={"Module No"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Module No" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseModuleModal;
