import { getToken } from '../../helper/sessionHelper';
import useAxiosPublic from './../../hook/UseAxiosHook';

const axiosPublic = useAxiosPublic();

const config = {
    headers : {
        Authorization: getToken() ,
    }
}

export const createAccount = async (payload) => {
    let res = await axiosPublic.post(`${baseUrl}/sing-up`, payload);
    if (res.data["status"] === "success") {
        return res.data["status"];
    } else {
        return false;
    }
};

export const adminProfileUpdateApi = async (payload) => {
    let res = await axiosPublic.put(`/profile-update`, payload,config);
    if (res.data["status"] === "success") {
        return res.data["status"];
    } else {
        return false;
    }
};