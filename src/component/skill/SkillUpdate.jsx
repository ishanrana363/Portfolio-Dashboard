import { useEffect, useState } from "react";
import { createSkillApi, updateSkillApi } from "../../apiRequest/skill-api/skillApi";
import { uploadImg } from "../../upload-img/UploadImg";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../full-screen-loder/Spinner";
import skillStore from "../../apiRequest/skill-api/skillStore";
import { useNavigate, useParams } from "react-router-dom";
import { updateAlert } from "../../helper/updateAlert";
import { Helmet } from "react-helmet-async";

const SkillUpdate = () => {
    const { totalSkillDataApi, singleSkillDataApi, singleSkillData } = skillStore();
    const { id } = useParams();
    const navigate = useNavigate();
    let { img: incomingImg } = singleSkillData;

    useEffect(() => {
        (async () => {
            setLoader(true);
            await singleSkillDataApi(id);
            setLoader(false);
        })()
    }, [id])
    const [loader, setLoader] = useState(false);
    const handleUpdateSkill = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        let img = e.target.img.files[0];

        let skillImg = incomingImg;

        if (!img?.name) {
            skillImg = incomingImg
        } else {
            skillImg = await uploadImg(img);
        }

        const payload = {
            name,
            img: skillImg,
        };
        setLoader(true)        
        let resp = await updateAlert(payload);
        setLoader(false)
        if(resp.isConfirmed){
            setLoader(true)
            let res = await updateSkillApi(id, payload);
            setLoader(false);
            if(res){
                setLoader(true);
                await totalSkillDataApi(1, 5, 0);
                setLoader(false);
                navigate("/dashboard/all-skill")
                toast.success("Skill updated successfully!");
            }else{
                toast.error("Failed to update skill!");
            }
        }


    };
    return (
        <>
        <Helmet>
            <title>Dashboard | Update Skill</title>
        </Helmet>
            <div className=" my-16 " >
                <div className="flex justify-center  items-center animate-zoom-in">
                    <div className="w-full max-w-md bg-gray-300 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-center mb-6 animate-fade-in-right ">({singleSkillData?.name}) Update Your Skill</h2>
                        <form className="" onSubmit={handleUpdateSkill} >
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
                                    defaultValue={singleSkillData?.name}
                                    key={Date.now()}
                                />
                            </div>

                            <div className="avatar">
                                <div className="w-12 ">
                                    <img key={Date.now()} className="rounded-full" src={singleSkillData?.img} />
                                </div>
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

export default SkillUpdate;
