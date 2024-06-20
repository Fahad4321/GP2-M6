import axiosInstance from "../helper/axiosInstance.js";
import toast from "react-hot-toast";

export const createCategoryRequest = async (values) => {
    try {
        const URL = 'courses/categories';
        const result = await axiosInstance.post(URL, values);
        toast.success('Category is created');
        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error("Category already exists!");
            return false;
        }
        return false;
    }

}
export const getAllCategoriesRequest = async (pageNo, perPage, searchKeyword='0') => {
    try {
        const URL = `courses/categories/${pageNo}/${perPage}/${searchKeyword}`;
        const {data} = await axiosInstance.get(URL);

        return data?.categories;
    } catch (e) {
        return false;
    }

}
export const getCategoriesDropDown = async () => {
    try {
        const URL = `courses/categories`;
        const {data} = await axiosInstance.get(URL);

        return data;
    } catch (e) {
        return false;
    }

}
export const getCategorybyID = async (id) => {
    try {
        const URL = `courses/categories/${id}`;
        const data = await axiosInstance.get(URL);

        return data;
    } catch (e) {
        return false;
    }

}
export const updateCategorybyID = async (id, body) => {
    try {
        const URL = `courses/categories/${id}`;
        const data = await axiosInstance.patch(URL, body);
        toast.success('Category is updated')
        return true;
    } catch (e) {
        if (e?.response?.data?.error) {
            toast.error("Category already exists!");
            return false;
        }
        return false;
    }

}
export const deleteCategoryRequest = async (id) => {
    try {
        const URL = `courses/categories/${id}`;
        const result = await axiosInstance.delete(URL);

        toast.success('Category deleted successfully!')
        return true;
    } catch (e) {
        return false;
    }

}


