import { create } from "zustand";
import useAxiosPublic from '../../hook/UseAxiosHook';
import { getToken } from "../../helper/sessionHelper";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const projectStore = create((set) => ({
    totalProjectLength: [],
    totalProjectDataList: [],
    totalProjectDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/all-project-by-admin/${pageNo}/${perPage}/${searchValue}`,config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalProjectDataList: res.data["data"]["0"]["Rows"] });
                set({ totalProjectLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleProjectData : [],
    singleProjectDataApi: async (id) => {
        let res = await useAxios.get(`/sigle-project/${id}`, config);
        if (res.data["status"] === "success") {
            set({ singleProjectData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default projectStore;