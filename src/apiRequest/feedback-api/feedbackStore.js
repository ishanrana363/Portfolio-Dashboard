import { create } from "zustand";
import useAxiosPublic from '../../hook/UseAxiosHook';
import { getToken } from "../../helper/sessionHelper";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const feedbackStore = create((set) => ({
    totalFeedbackLength: [],
    totalFeedbackDataList: [],
    totalFeedbackDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/feedback/${pageNo}/${perPage}/${searchValue}`,config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalFeedbackDataList: res.data["data"]["0"]["Rows"] });
                set({ totalFeedbackLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleFeedbackData : [],
    singleFeedbackDataApi: async (id) => {
        let res = await useAxios.get(`/single-feedback/${id}`);
        if (res.data["status"] === "success") {
            set({ singleFeedbackData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default feedbackStore;