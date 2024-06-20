import axiosInstance from "../helper/axiosInstance";
import {message} from 'antd'

export const createCourseModuleRequest = async (values) => {
    try {
        const URL = '/courses/modules';

        const {data} = await axiosInstance.post(URL, values);
        message.success('Course module created successfully!');
        return true;
    } catch (e) {
        if (e?.response?.status === 500){
            message.error("Server error occurred")
            return false
        } else if (e?.response?.status === 400 || e?.response?.status === 401 || e?.response?.status === 403) {
            message.error(e?.response?.data?.error)
            return false
        }
    }

}

export const getModulesDropDown = async (id) => {
    try {
        const URL = `courses/modulesdropdown/${id}`;
        const {data} = await axiosInstance.get(URL);

        return data;
    } catch (e) {
        return false;
    }

}
export const getModulesDropDownByCourseTeacher = async (courseId) => {
    try {
        const URL = `dropdown-modules/teacher/${courseId}`;
        const {data} = await axiosInstance.get(URL);

        return data;
    } catch (e) {
        return false;
    }

}

export const updateModulebyID = async (id, body) => {
    try {
        const URL = `/courses/modules/${id}`;
        const data = await axiosInstance.patch(URL, body);
        toast.success('Module is updated')
        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error(e?.response?.data?.error);
            return false;
        }
        return false;
    }

}