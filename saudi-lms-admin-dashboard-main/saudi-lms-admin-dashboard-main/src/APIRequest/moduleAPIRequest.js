import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const createModuleRequest = async (values) => {
  try {
    const URL = "/courses/modules";

    await axiosInstance.post(URL, values);

    toast.success("Module created successfully!");

    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }

    return false;
  }
};

export const getModulesDropDown = async (id) => {
  try {
    const URL = `courses/modulesdropdown/${id}`;
    const { data } = await axiosInstance.get(URL);

    return data;
  } catch (e) {
    return false;
  }
};

export const updateModulebyID = async (id, body) => {
  try {
    const URL = `/courses/modules/${id}`;
    await axiosInstance.patch(URL, body);
    toast.success("Module is updated");
    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};
