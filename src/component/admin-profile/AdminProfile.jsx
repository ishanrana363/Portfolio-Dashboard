import React, { useEffect, useState } from 'react'
import adminStore from '../../apiRequest/admin-api/adminStore';
import SpinnerLoader from '../full-screen-loder/Spinner';
import { uploadImg } from '../../upload-img/UploadImg';
import { adminProfileUpdateApi } from '../../apiRequest/admin-api/adminApi';
import toast, { Toaster } from 'react-hot-toast';

const AdminProfile = () => {
    const [loader, setLoader] = useState(false);
    const { adminProfileDataApi, adminProfileData } = adminStore();
    let { img: incomingImg } = adminProfileDataApi;
    useEffect(() => {
        (async () => {
            setLoader(true);
            await adminProfileDataApi();
            setLoader(false);
        })()
    }, [])

    const updateProfile = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const img = e.target.img.files[0];

        let userImg = incomingImg;

        if (!img?.name) {
            userImg = incomingImg
        } else {
            userImg = await uploadImg(img);
        }

        const payload = {
            name,
            email,
            role,
            img: userImg,
        };

        setLoader(true);
        let res = await adminProfileUpdateApi(payload);
        setLoader(false);
        if (res) {
            setLoader(true);
            await adminProfileDataApi();
            setLoader(false);
            toast.success("Profile updated successfully")
        } else {
            toast.error("Profile updated fail");
        }

    }
    return (
        <div>
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold text-center mb-6">({adminProfileData?.name}) Profile </h2>
                <form onSubmit={updateProfile} >
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter your name"
                            defaultValue={adminProfileData?.name}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            readOnly
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter your email"
                            defaultValue={adminProfileData?.email}
                        />
                    </div>

                    {/* Role Radio Buttons */}
                    <div className="mb-4">
                        <label htmlFor='role' className="block text-gray-700 font-medium mb-2">Role</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter your name"
                            defaultValue={adminProfileData?.role}
                            readOnly
                        />
                    </div>

                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src= {adminProfileData?.img} />
                        </div>
                    </div>

                    <div className="mb-4 my-4 ">
                        <label htmlFor='img' className="block text-gray-700 font-medium mb-2">Profile Img</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {
                loader && (
                    <div>
                        <SpinnerLoader></SpinnerLoader>
                    </div>
                )
            }
            <Toaster position='top-center'/>
        </div>
    )
}

export default AdminProfile
