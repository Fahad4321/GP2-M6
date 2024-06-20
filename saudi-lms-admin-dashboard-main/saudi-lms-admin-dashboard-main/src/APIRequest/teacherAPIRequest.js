import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const registerTeacherRequest = async (values) => {
  try {
    const URL = "/teachers";
    const { data } = await axiosInstance.post(URL, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "*/*",
      },
    });
    toast.success(data?.message);
    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};
export const getAllTeacherRequest = async (
  pageNo = 1,
  perPage = 10,
  keyword = "0"
) => {
  try {
    const URL = `/teachers/${pageNo}/${perPage}/${keyword}`;
    const { data } = await axiosInstance.get(URL);
    return data;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};
export const getTeacherDropDown = async (
  pageNo = 1,
  perPage = 10,
  keyword = "0"
) => {
  try {
    const URL = `/teachers`;
    const { data } = await axiosInstance.get(URL);
    return data;
  } catch (e) {
    return false;
  }
};

export const getAllAppliedTeacherRequest = async (
  pageNo = 1,
  perPage = 10,
  searchKeyword = 0
) => {
  try {
    const URL = `/teachersapply/${pageNo}/${perPage}/${searchKeyword}`;

    const { data } = await axiosInstance.get(URL);

    return data;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};

export const updateTeacherAppliedStatusRequest = async (obj) => {
  try {
    const { id, status } = obj;
    let URL = "/teachersapply/" + id;
    const result = await axiosInstance.patch(URL, { status });
    toast.success("Teacher updated successfully!");
    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error(e?.response?.data?.error);
      return false;
    }
    return false;
  }
};
