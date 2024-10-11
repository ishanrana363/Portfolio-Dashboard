import { create } from "zustand";
import useAxiosPublic from '../../hook/UseAxiosHook';
import { getToken } from "../../helper/sessionHelper";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const serviceStore = create((set) => ({
    totalServiceLength: [],
    totalServiceDataList: [],
    totalServiceDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/all-service-by-admin/${pageNo}/${perPage}/${searchValue}`,config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalServiceDataList: res.data["data"]["0"]["Rows"] });
                set({ totalServiceLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleServiceData : [],
    singleServiceDataApi: async (id) => {
        let res = await useAxios.get(`/single-service/${id}`);
        if (res.data["status"] === "success") {
            set({ singleServiceData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default serviceStore;