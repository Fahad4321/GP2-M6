import axiosInstance from "../helper/axiosInstance.js";
import toast from "react-hot-toast";

export const createSessionRequest = async (values) => {
    try {
        const URL = '/live-session';

        const {data} = await axiosInstance.post(URL, values, {
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: '*/*'
            }
        });

        toast.success('Live Session Create successfully!');

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

export const getLiveSession = async (courseId, moduleId)=>{
    try {
        const URL = `/live-session/course`;
        const params = { courseId: courseId, moduleId: moduleId, };
        const {data} = await axiosInstance.get(URL,  { params });
        return data;
    }catch (e) {
        if (e?.response?.status === 500){
            message.error("Server error occurred")
        }else if(e?.response?.status === 401 ){
            logOut()
        } else if (e?.response?.status === 400 || e?.response?.status === 403) {
            message.error(e?.response?.data?.error)
        }
    }
}
