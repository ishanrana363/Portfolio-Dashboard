import { getToken } from "../../helper/sessionHelper";
import useAxiosPublic from "../../hook/UseAxiosHook";


const axiosPublic = useAxiosPublic();

const config = {
    headers: {
        Authorization: getToken(),
    },
};


export const createBlogApi = async (payload)=>{
    let res = await axiosPublic.post(`/blog-create`,payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const updateBlogApi = async (id, payload)=>{
    let res = await axiosPublic.put(`/blog-update/${id}`, payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const deleteBlogApi = async (id)=>{
    let res = await axiosPublic.delete(`/blog-delete/${id}`,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};