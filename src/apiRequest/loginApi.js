import axios from "axios";
import { setToken } from "../helper/sessionHelper";


const baseUrl = `https://protfillo-backend.vercel.app/api/v1`;

export const adminLoginApi = async (payload) => {
    let res = await axios.post(`${baseUrl}/login`, payload);
    if (res.data["status"] === "success") {
        console.log(res.data.status);
        setToken(res.data["token"]);
        return true;
    } else {
        return false;
    }
};
