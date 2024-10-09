import { useState } from "react";
import { createSkillApi } from "../../apiRequest/skill-api/skillApi";
import { uploadImg } from "../../upload-img/UploadImg";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../full-screen-loder/Spinner";

const SkillCreate = () => {
    const [loader, setLoader] = useState(false);
    const handelSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        let img = e.target.img.files[0];

        let ImageUrl = '';
        if (!img?.name) {
            ImageUrl = ""
        }
        ImageUrl = await uploadImg(img);

        const payload = {
            name,
            img: ImageUrl
        };
        setLoader(true)
        const res = await createSkillApi(payload);
        setLoader(false)
        if (res) {
            toast.success("Skill created successfully")
        }else{
            toast.error("Failed to create skill")
        }


    };
    return (
        <>
            <div className=" my-16 " >
                <div className="flex justify-center  items-center animate-zoom-in">
                    <div className="w-full max-w-md bg-gray-300 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-center mb-6 animate-fade-in-right ">Create Your Skill</h2>
                        <form className="" onSubmit={handelSubmit} >
                            {/* Name */}
                            <div className="mb-4 animate-fade-in-left ">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter your skill name"
                                />
                            </div>

                            {/* Input Field */}
                            <div className="mb-4 animate-fade-in-right ">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                    Image
                                </label>
                                <input
                                    id="img"
                                    type="file"
                                    name="img"
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter additional info"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center animate-fade-in-left ">
                                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-400">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
    )
}

export default SkillCreate
