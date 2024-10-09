import axios from "axios";
import { getToken } from "../helper/sessionHelper";

const config = {
    headers: {
        Authorization: getToken(), 
    },
};

console.log(config);

export const createProjectApi = async (payload) => {
    try {
        let res = await axios.post(
            `https://protfillo-backend.vercel.app/api/v1/project-create`,
            payload,
            config
        );
        if (res.data.status === "success") {
            console.log(res.data.status);
        } else {
            console.log(res.data.message);
        }
    } catch (error) {
        console.log("Error:", error.response ? error.response.data : error.message);
    }
};
