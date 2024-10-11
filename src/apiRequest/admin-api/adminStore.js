import { getToken } from "../../helper/sessionHelper";
import useAxiosPublic from "../../hook/UseAxiosHook";
import { create } from 'zustand';

const config = {
    headers: {
        Authorization: getToken(),
    },
};

const axiosPublic = useAxiosPublic();

const adminStore = create((set)=>({
    adminProfileData : [],
    adminProfileDataApi : async ()=>{
        let res = await axiosPublic.get("/admin-profile",config);
        if(res.data["status"] === "success"){
            set({ adminProfileData : res.data["data"] });
        } else {
            return false;
        }
    }
}));

export default adminStore;