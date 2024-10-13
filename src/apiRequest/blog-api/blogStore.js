import { create } from "zustand";
import useAxiosPublic from '../../hook/UseAxiosHook';
import { getToken } from "../../helper/sessionHelper";


const useAxios = useAxiosPublic();


const config = {
    headers: {
        Authorization: getToken(),
    },
};

const blogStore = create((set) => ({
    totalBlogLength: [],
    totalBlogDataList: [],
    totalBlogDataApi: async (pageNo, perPage, searchValue) => {
        let res = await useAxios.get(`/blogs/${pageNo}/${perPage}/${searchValue}`,config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalBlogDataList: res.data["data"]["0"]["Rows"] });
                set({ totalBlogLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    singleBlogData : [],
    singleBlogDataApi: async (id) => {
        let res = await useAxios.get(`/single-blog/${id}`);
        if (res.data["status"] === "success") {
            set({ singleBlogData: res.data["data"]});
        } else {
            return false;
        }
    },
}))

export default blogStore;