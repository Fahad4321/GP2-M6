import React, { useEffect } from "react";
import { getRolesRequest } from "../../APIRequest/rolePermissionApiRequest";
import CreateRoleForm from "../../components/roleManage/CreateRoleForm.jsx";
import RoleList from "../../components/roleManage/RoleList.jsx";
import title from "../../utils/title.js";

const RoleManage = () => {
  useEffect(() => {
    getRolesRequest().then((res) => {});
  }, []);
  title("Role List");

  return (
    <>
      <CreateRoleForm />
      <RoleList />
    </>
  );
};

export default RoleManage;
