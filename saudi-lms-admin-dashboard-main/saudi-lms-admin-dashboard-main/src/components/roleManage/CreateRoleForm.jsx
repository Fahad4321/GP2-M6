import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Modal } from "antd";
import {
  createRoleRequest,
  getRolesRequest,
} from "../../APIRequest/rolePermissionApiRequest.js";

const CreateRoleForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    setLoading(true);
    const result = await createRoleRequest(values);

    setLoading(false);
    await getRolesRequest("0", 1, 10);
    if (result) {
      setIsModalOpen(false);
      values.name = "";
    }
    setLoading(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <Button type="primary" onClick={showModal}>
          Create A New Role
        </Button>
      </div>

      <Modal
        title="Create Role"
        open={isModalOpen}
        footer={null}
        closable={false}
      >
        <Form
          onFinish={onFinish}
          name="basic"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Role Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your role name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center px-4">
            <div></div>
            <div className="d-flex align-items-center gap-3">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="default"
                  onClick={handleCancel}
                  className="text-secondary-color"
                  htmlType="button"
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRoleForm;
