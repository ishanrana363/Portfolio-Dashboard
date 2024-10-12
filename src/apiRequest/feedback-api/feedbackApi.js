import useAxiosPublic from "../../hook/UseAxiosHook";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: `${localStorage.getItem('token')}`,
    },
};

export const feedbackCreateApi = async (payload)=>{
    let res = await useAxios.post(`/feedback-create`, payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const feedbackDeleteApi = async (id)=>{
    let res = await useAxios.delete(`/feedback-delete/${id}`,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};


export const feedbackUpdateApi = async (id,payload)=>{
    let res = await useAxios.put(`/feedback-update/${id}`, payload,config);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};