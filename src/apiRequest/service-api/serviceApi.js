
import useAxiosPublic from './../../hook/UseAxiosHook';
const useAxios = useAxiosPublic();
import { getToken } from "../../helper/sessionHelper";

const config = {
    headers: {
        Authorization: getToken(),
    },
};


export const serviceCreateApi = async (payload)=>{
    let res = await useAxios.post(`/service-create`,payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const serviceDeleteApi = async (id)=>{
    let res = await useAxios.delete(`/service-delete/${id}`,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const serviceUpdateApi = async (id, payload)=>{
    let res = await useAxios.put(`/service-update/${id}`, payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};