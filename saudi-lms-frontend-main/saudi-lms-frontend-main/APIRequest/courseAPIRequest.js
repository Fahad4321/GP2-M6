import axiosInstance from "../helper/axiosInstance.js";
import toast from "react-hot-toast";
import {message} from "antd";


export const createCourseRequest = async (values) => {
    try {
        const URL = '/courses';

        const {data} = await axiosInstance.post(URL, values, {
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: '*/*'
            }
        });

        toast.success('Course created successfully!');

        return true;
    } catch (e) {
        toast.error('Server Error!');
        // if (e?.response?.data?.error) {
        //     toast.error(e?.response?.data?.error);
        //     return false;
        // }

        return false;
    }

}
export const getCoursesDropDown = async () => {
    try {
        const URL = `/courses`;
        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        message.error('something went wrong!')
        return false;
    }

}
export const getCoursesDropDownByTeacher = async () => {
    try {
        const URL = `/dropdown-courses/teacher`;
        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        message.error('something went wrong!')
        return false;
    }

}
export const getCoursesDropDownByStudent = async () => {
    try {
        const URL = `/dropdown-courses/student`;
        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        message.error('something went wrong!')
        return false;
    }

}

export const updateCoursebyID = async (id, body) => {
    try {
        const URL = `courses/${id}`;
        const data = await axiosInstance.patch(URL, body,{
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: '*/*'
            }
        });
        toast.success('Course is updated')
        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error("Course already exists!");
            return false;
        }
        return false;
    }

}
export const getCoursebyID = async (id) => {
    try {
        const URL = `/courses/${id}`

        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        toast.error('Server Error!');
        // if (e?.response?.data?.error) {
        //     toast.error(e?.response?.data?.error);
        //     return false;
        // }

        return false;
    }

}
