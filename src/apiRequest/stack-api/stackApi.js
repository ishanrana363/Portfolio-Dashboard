
import useAxiosPublic from './../../hook/UseAxiosHook';

const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: `${localStorage.getItem('token')}`,
    },
};

export const uploadStackApi = async (payload) => {
    let res = await useAxios.post(`/stack-create`, payload, config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }

}

export const deleteStack = async (id)=>{
    let res = await useAxios.delete(`/stack-delete/${id}`);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
}