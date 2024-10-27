
import { create } from 'zustand';
import useAxiosPublic from './../../hook/UseAxiosHook';
const axiosPublic = useAxiosPublic();


const logoStore =  create((set)=>({
    logoData: [],
    logoDataApi : async ()=>{
        try {
            const res = await axiosPublic.get('/all-logo');
            if(res.data.status ==='success'){
                set({logoData: res.data.data})
            } else {
                return false;
            }
            
        } catch (error) {
            console.error('Error fetching logo data: ', error);
        }
    },
    singleLogoData: [],
    singleLogoDataApi: async (id) => {
        let res = await axiosPublic.get(`/single-logo/${id}`);
        if (res.data["status"] === "success") {
            set({ singleLogoData: res.data["data"]});
        } else {
            return false;
        }
    },

}));

export default logoStore;