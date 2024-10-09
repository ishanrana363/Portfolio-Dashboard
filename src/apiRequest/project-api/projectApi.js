import axios from "axios";
import { getToken } from "../../helper/sessionHelper";
import useAxiosPublic from "../../hook/UseAxiosHook";
const baseUrl = `https://protfillo-backend.vercel.app/api/v1/project-create`
const config = {
    headers: {
        Authorization: getToken(),
    },
};

const axiosPublic = useAxiosPublic();

export const createProjectApi = async (payload) => {
    try {
        let res = await axiosPublic.post(
            `${baseUrl}`,
            payload,
            config
        );
        if (res.data.status === "success") {
            return res.data.status
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
export const projectDeleteApi = async (id)=>{
    let res = await axiosPublic.delete(`/project-delete/${id}`,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
}

export const projectUpdateApi = async (id,payload)=>{
    let res = await axiosPublic.put(`/project-update/${id}`, payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};