import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const createCourseRequest = async (values) => {
  try {
    const URL = "/courses";

    const { data } = await axiosInstance.post(URL, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "*/*",
      },
    });

    toast.success("Course created successfully!");

    return true;
  } catch (e) {
    toast.error("Server Error!");
    return false;
  }
};
export const getAllCoursesRequest = async (
  pageNo,
  perPage,
  searchKeyword = 0
) => {
  try {
    const URL = `/courses/${pageNo}/${perPage}/${searchKeyword}`;

    const { data } = await axiosInstance.get(URL);

    return data;
  } catch (e) {
    toast.error("Server Error!");
    // if (e?.response?.data?.error) {
    //     toast.error(e?.response?.data?.error);
    //     return false;
    // }

    return false;
  }
};
export const getCoursebyID = async (id) => {
  try {
    const URL = `/courses/${id}`;

    const { data } = await axiosInstance.get(URL);
    return data;
  } catch (e) {
    toast.error("Server Error!");
    // if (e?.response?.data?.error) {
    //     toast.error(e?.response?.data?.error);
    //     return false;
    // }

    return false;
  }
};

export const updateCoursebyID = async (id, body) => {
  try {
    const URL = `courses/${id}`;
    const data = await axiosInstance.patch(URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "*/*",
      },
    });
    toast.success("Course is updated");
    return true;
  } catch (e) {
    if (e?.response?.data?.error) {
      toast.error("Course already exists!");
      return false;
    }
    return false;
  }
};

export const getCoursesDropDown = async () => {
  try {
    const URL = `/courses`;
    const { data } = await axiosInstance.get(URL);

    return data;
  } catch (e) {
    return false;
  }
};
