import useAxiosPublic from "../hook/UseAxiosHook";


const axiosPublic = useAxiosPublic();


export const sendEmailApi = async (payload) => {
    let res = await axiosPublic.post(`/send-otp`, payload);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }

};

export const otpEmailVerifyApi = async (payload) => {
    let res = await axiosPublic.post(`/otp-verify`, payload);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};

export const forgotPasswordApi = async (payload) => {
    let res = await axiosPublic.post(`/forget-password`, payload);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }
};