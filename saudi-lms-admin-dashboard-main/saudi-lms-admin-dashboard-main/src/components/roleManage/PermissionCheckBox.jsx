import React, { useEffect } from "react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import {
  assignPermissionRequest,
  getAllPermissionRequest,
  getPermissionByRoleRequest,
} from "../../APIRequest/rolePermissionApiRequest";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store/store.js";
import {
  setCheckedValue,
  setPermissionByRole,
} from "../../redux/state/permission-slice.js";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import title from "../../utils/title.js";

const PermissionCheckBox = () => {
  const { name } = useParams();

  const location = useLocation();
  const roleId = location.state.roleId;
  const permissions = useSelector((state) => state.permissions.list);
  const checkedValues = useSelector((state) => state.permissions.checkedValues);
  const dispatch = useDispatch();

  useEffect(() => {
    getPermissionByRoleRequest(roleId).then((res) => {
      dispatch(setPermissionByRole(res[0].permissions));
    });
  }, [roleId]);

  useEffect(() => {
    getAllPermissionRequest().then((res) => {});
  }, []);

  const onChange = (checkedValues) => {
    store.dispatch(setCheckedValue(checkedValues));
  };

  const assignPermission = () => {
    const permissions = {
      permissions: checkedValues,
    };
    assignPermissionRequest(roleId, permissions).then((res) => {
      if (res) {
        toast.success("Permission successfully assigned");
      }
    });
  };

  title(`${name} permissions update`);

  return (
    <>
      <Card className="mb-4">
        <h6 className="fw-bold text-primary-color">
          {name.toUpperCase()} - Permissions
        </h6>
      </Card>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
        value={checkedValues}
      >
        <Row gutter={16}>
          {permissions.map((permission) => (
            <Col span={8} className="p-3">
              <Checkbox value={permission?._id}>{permission?.name}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
      <hr />

      <Button
        onClick={assignPermission}
        className="bg-primary-color text-white"
      >
        Save
      </Button>
    </>
  );
};

export default PermissionCheckBox;
