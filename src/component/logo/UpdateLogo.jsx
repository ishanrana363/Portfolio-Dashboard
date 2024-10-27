import React, { useEffect, useState } from 'react'
import { uploadImg } from './../../upload-img/UploadImg';
import { createAlert } from '../../helper/createAlert';
import { logoCreateApi, logoUpdateApi } from '../../apiRequest/logo-api/logoApi';
import toast from 'react-hot-toast';
import SpinnerLoader from './../full-screen-loder/Spinner';
import Swal from 'sweetalert2';
import logoStore from '../../apiRequest/logo-api/logoStore';
import { useParams } from 'react-router-dom';
import { updateAlert } from './../../helper/updateAlert';

const UpdateLogo = () => {
    const { singleLogoData, singleLogoDataApi } = logoStore();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        (async () => {
            setLoader(true);
            await singleLogoDataApi(id);
            setLoader(false);
        })()
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const logo = e.target.logo.files[0];

        let logoUrl = "";
        if (!logo?.name) {
            logoUrl = ''
        }
        logoUrl = await uploadImg(logo);
        const payload = {
            logo: logoUrl,
        };

        const resp = await updateAlert();
        if (resp.isConfirmed) {
            setLoader(true);
            const res = await logoUpdateApi(id,payload);
            setLoader(false);
            if (res) {
                await singleLogoDataApi(id);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your logo uploaded successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
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
                        <div>
                            <h1 className='text-center my-5 ' >Update logo fomr</h1>
                        </div>
                        <div className="mb-4">
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                                    <img key={Date.now()} src= { singleLogoData?.logo } />
                                </div>
                            </div>
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Upload Logo
                            </label>
                            <input
                                type="file"
                                id="username"
                                name='logo'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default UpdateLogo;
