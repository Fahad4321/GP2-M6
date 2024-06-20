import { toast } from "react-hot-toast";
import axiosInstance from "../helper/axiosInstance";

export const getAllTeacherRequest = async (pageNo = 1, perPage = 10, keyword = '0') => {
    try {
        const URL = `/teachers/${pageNo}/${perPage}/${keyword}`;
        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error(e?.response?.data?.error);
            return false;
        }
        return false;
    }
}
export const getTeacherRequestDetails = async (teacherId) => {
    try {
        const URL = `/teachers/${teacherId}`;
        const {data} = await axiosInstance.get(URL);
        return data;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error(e?.response?.data?.error);
            return false;
        }
        return false;
    }

}