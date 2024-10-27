import React, { useState } from 'react'
import { uploadImg } from './../../upload-img/UploadImg';
import { createAlert } from '../../helper/createAlert';
import { logoCreateApi } from '../../apiRequest/logo-api/logoApi';
import toast from 'react-hot-toast';
import SpinnerLoader from './../full-screen-loder/Spinner';
import Swal from 'sweetalert2';

const UploadLogo = () => {
    const [loader,setLoader] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const logo = e.target.logo.files[0];

        let logoUrl = "";
        if(!logo?.name){
            logoUrl = ''
        }
        logoUrl = await uploadImg(logo);
        const payload = {
            logo : logoUrl,
        };

        const resp = await createAlert();
        if( resp.isConfirmed){
            setLoader(true);
            const res = await logoCreateApi(payload);
            setLoader(false);
            if(res){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your logo uploaded successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{
                toast.error("Failed to upload logo!");
            }
        }
        e.target.reset();
    }
    return (
        <div>
            <div className="flex justify-center my-10 ">
                <div className="max-w-md bg-white shadow-md rounded-lg p-8">

                    {/* Form */}
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Logo
                            </label>
                            <input
                                type="file"
                                id="username"
                                name='logo'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                               {
                                loader ? "Uploading..." : " Upload Logo"
                               }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                loader && (
                    <div>
                        <SpinnerLoader></SpinnerLoader>
                    </div>
                )
            }
        </div>
    )
}

export default UploadLogo
