import { getToken } from "../../helper/sessionHelper";
import useAxiosPublic from "../../hook/UseAxiosHook";

const axiosPublic = useAxiosPublic();

const config = {
    headers: {
        Authorization: getToken(),
    },
}

export const createSkillApi = async (payload)=>{
    let res = await axiosPublic.post(`/skill-create`,payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
}

export const deleteSkillApi = async (id)=>{
    let res = await axiosPublic.delete(`/skill-delete/${id}`,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};