import { create } from "zustand";
import { getToken } from "../../helper/sessionHelper";
import useAxiosPublic from './../../hook/UseAxiosHook';


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const stackStore = create((set) => ({
    totalStackLength: [],
    totalStackDataList: [],
    totalStackDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/all-stack-admin/${pageNo}/${perPage}/${searchValue}`);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalStackDataList: res.data["data"]["0"]["Rows"] });
                set({ totalStackLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleStackData : [],
    singleStackDataApi: async (id) => {
        let res = await useAxios.get(`/single-stack/${id}`);
        if (res.data["status"] === "success") {
            set({ singleStackData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default stackStore;