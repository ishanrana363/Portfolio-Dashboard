import axios from 'axios';

// const backendUrl = `http://localhost:3000/api/v1`;
const backendUrl = `https://protfillo-backend.vercel.app/api/v1`;


const axiosPublic = axios.create({
    baseURL: backendUrl
})

const useAxiosPublic = () => {
    return axiosPublic;
}


export default useAxiosPublic;