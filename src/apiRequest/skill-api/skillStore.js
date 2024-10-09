import { create } from "zustand";
import useAxiosPublic from '../../hook/UseAxiosHook';
import { getToken } from "../../helper/sessionHelper";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const skillStore = create((set) => ({
    totalSkillLength: [],
    totalSkillDataList: [],
    totalSkillDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/all-skill-by-admin/${pageNo}/${perPage}/${searchValue}`,config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalSkillDataList: res.data["data"]["0"]["Rows"] });
                set({ totalSkillLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleSkillData : [],
    singleSkillDataApi: async (id) => {
        let res = await useAxios.get(`/single-skill/${id}`, config);
        if (res.data["status"] === "success") {
            set({ singleSkillData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default skillStore;