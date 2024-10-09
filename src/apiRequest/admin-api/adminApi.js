import axios from "axios";


const baseUrl = `https://protfillo-backend.vercel.app/api/v1`;

export const createAccount = async (payload) => {
    let res = await axios.post(`${baseUrl}/sing-up`, payload);
    if (res.data["status"] === "success") {
        return res.data["status"];
    } else {
        return false;
    }
};
