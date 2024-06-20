import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";


export const createContentRequest = async (values) => {
    try {
        const URL = '/courses/contents';

        const contents = values?.contents.map(obj => {
            obj.courseId = values.courseId
            obj.moduleId = values.moduleId
            return obj;
        })
        const {data} = await axiosInstance.post(URL, {contents});

        toast.success('Content created successfully!');

        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error(e?.response?.data?.error);
            return false;
        }

        return false;
    }

}

export const updateContentbyID = async (id, body) => {
    try {
        const URL = `/courses/contents/${id}`;
        const data = await axiosInstance.patch(URL, body);
        toast.success('Content is updated')
        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error(e?.response?.data?.error);
            return false;
        }
        return false;
    }

}