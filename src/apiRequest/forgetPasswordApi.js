import useAxiosPublic from "../hook/UseAxiosHook";


const axiosPublic = useAxiosPublic();


export const sendEmailApi = async (payload) => {
    let res = await axiosPublic.post(`/send-otp`, payload);
    if (res.data.status === "success") {
        return res.data.status
    } else {
        return false;
    }

}