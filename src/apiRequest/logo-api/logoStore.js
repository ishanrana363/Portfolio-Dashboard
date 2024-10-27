
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
    }

}));

export default logoStore;