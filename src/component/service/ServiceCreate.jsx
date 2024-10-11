import React from 'react'
import { Helmet } from 'react-helmet-async'
import { uploadImg } from './../../upload-img/UploadImg';
import { serviceCreateApi } from '../../apiRequest/service-api/serviceApi';
import toast, { Toaster } from 'react-hot-toast';
import SpinnerLoader from '../full-screen-loder/Spinner';

const ServiceCreate =  () => {
    const [loader, setLoader] = React.useState(false);
    const handleSubmitForm = async(e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const img = e.target.img.files[0];

        let ImageUrl = '';
        if (!img?.name) {
            ImageUrl = ""
        }
        ImageUrl = await uploadImg(img);
        const payload = {
            name,
            img: ImageUrl,
        };
        setLoader(true);
        const res = await serviceCreateApi(payload);
        setLoader(false);
        if (res) {
            toast.success("Service created successfully")
        } else {
            toast.error("Failed to create service")
        }
        e.target.reset();
    };
    return (

        <div >
            <Helmet>
                <title>Dashboard | Service Create </title>
            </Helmet>
            <>
                <div className="flex justify-center items-center my-16 ">
                    <form onSubmit={handleSubmitForm} className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center ">Service Create Form</h2>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your service name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="img" className="block text-gray-700 mb-2">
                                Image URL
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {
                    loader && (
                        <div>
                            <SpinnerLoader></SpinnerLoader>
                        </div>
                    )
                }
                <Toaster position="top-center"></Toaster>
            </>
        </div>
    )
}

export default ServiceCreate
