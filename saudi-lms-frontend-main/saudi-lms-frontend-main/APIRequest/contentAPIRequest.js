import axiosInstance from "../helper/axiosInstance.js";
import { message } from "antd";

export const createContentRequest = async (values) => {
  try {
    const URL = "/courses/contents";
    const contents = values?.contents.map((obj) => {
      obj.courseId = values.courseId;
      obj.moduleId = values.moduleId;
      obj.contentType = values.contentType;
      return obj;
    });

    await axiosInstance.post(URL, { contents });
    message.success("Content created successfully!");

    return true;
  } catch (e) {
    if (e?.response?.status === 500) {
      message.error("Server error occurred");
      return false;
    } else if (
      e?.response?.status === 400 ||
      e?.response?.status === 401 ||
      e?.response?.status === 403
    ) {
      message.error(e?.response?.data?.error);
      return false;
    }
  }
};

export const updateContentbyID = async (id, body) => {
  try {
    const URL = `/courses/contents/${id}`;
    const data = await axiosInstance.patch(URL, body);
    toast.success("Content is updated");
    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};

export const uploadContentResource = async (files) => {
  try {
    const URL = "/courses/contents/upload-resource";
    const { data } = await axiosInstance.post(URL, files, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "*/*",
      },
    });
    return data;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};
