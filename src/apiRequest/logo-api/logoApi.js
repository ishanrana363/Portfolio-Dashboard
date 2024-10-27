
import { getToken } from '../../helper/sessionHelper';
import useAxiosPublic from './../../hook/UseAxiosHook';

const axiosPublic = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

export const logoCreateApi = async (payload)=>{
    let res = await axiosPublic.post(`/logo-create`, payload, config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const logoDeleteApi = async (id)=>{
    let res = await axiosPublic.delete(`/logo-delete/${id}`,config);
    if(res.data.status ==="success") {
        return res.data.status
    }else{
        return false;
    }
};