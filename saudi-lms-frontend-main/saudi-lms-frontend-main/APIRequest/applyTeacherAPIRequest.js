import axiosInstance from "../helper/axiosInstance";
import {message} from 'antd'

export const applyTeacherRequest = async (values) => {
    try {
        const URL = '/teachersapply';

        const {data} = await axiosInstance.post(URL, values);
        message.success('Successfully Applied for Teacher');

        return true;
    } catch (e) {
        if (e?.response?.status === 500){
            message.error("Server error occurred")
            return false
        } else if (e?.response?.status === 400 || e?.response?.status === 401 || e?.response?.status === 403) {
            message.error(e?.response?.data?.error)
            console.error(e?.response?.data?.error)
            return false
        }
    }

}