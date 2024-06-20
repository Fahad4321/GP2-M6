import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import store from "../redux/store/store.js";
import { setRoleList } from "../redux/state/role-slice.js";
import {
  setCheckedValue,
  setPermissionByRole,
  setPermissionList,
} from "../redux/state/permission-slice.js";

export const createRoleRequest = async (values) => {
  try {
    await axiosInstance.post(`/roles`, values);
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};
export const deleteRoleRequest = async (roleId) => {
  try {
    const { data } = await axiosInstance.delete(`/roles/${roleId}`);
    toast.success(data.message);
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const getRolesRequest = async (
  keyword = "0",
  page = 1,
  perPage = 10
) => {
  try {
    const { data } = await axiosInstance.get(
      `/roles/${keyword}/${page}/${perPage}`
    );
    store.dispatch(setRoleList(data.roles));
    return data;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const getAllPermissionRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/permissions`);
    store.dispatch(setPermissionList(data));
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const getPermissionByRoleRequest = async (roleId) => {
  try {
    const { data } = await axiosInstance.get(`/roles/permissions/${roleId}`);
    store.dispatch(setPermissionByRole(data[0].permissions));
    const checkedValue = data[0].permissions.reduce((acc, currentValue) => {
      return [...acc, currentValue._id];
    }, []);
    store.dispatch(setCheckedValue(checkedValue));
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};
export const assignPermissionRequest = async (roleId, permissions) => {
  try {
    await axiosInstance.patch(`/roles/permissions/${roleId}`, permissions);
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};
