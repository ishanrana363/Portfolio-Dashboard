import { useEffect, useState } from "react";
import projectStore from "../../apiRequest/project-api/projectStore"
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { uploadImg } from "../../upload-img/UploadImg";
import { updateAlert } from "../../helper/updateAlert";
import { projectUpdateApi } from "../../apiRequest/project-api/projectApi";
import toast, { Toaster } from "react-hot-toast";


const ProjectUpdate = () => {
    const { singleProjectDataApi, singleProjectData } = projectStore();
    const { totalProjectDataApi } = projectStore();
    const [loder, setLoder] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            setLoder(true);
            await singleProjectDataApi(id);
            setLoder(false);
        })()
    }, [id]);

    let { img: incomingImg } = singleProjectData;

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        let img = e.target.img.files[0];
        const url = e.target.url.value;
        const documentation = e.target.documentation.value;

        let projectImg = incomingImg;

        if (!img?.name) {
            projectImg = incomingImg
        } else {
            projectImg = await uploadImg(img);
        }
        const payload = {
            id,
            name,
            img: projectImg,
            url,
            documentation
        };

        console.log(payload)

        const resp = await updateAlert(payload)
        if (resp.isConfirmed) {
            setLoder(true)
            let res = await projectUpdateApi(id, payload);
            setLoder(false);
            if (res) {
                setLoder(true);
                await totalProjectDataApi(1, 5, 0);
                navigate("/dashboard/all-projects")
                setLoder(false);
                toast.success("Project updated successfully!");
            } else {
                toast.error("Failed to update project!");
            }
        }



        e.target.reset();



    }
    return (
        <>
            <div>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg animate-zoom-in">
                    <h2 className="text-2xl font-semibold text-center mb-4"> ({singleProjectData.name}) Update Project</h2>
                    <form onSubmit={handleUpdate} >
                        {/* Name Field */}
                        <div className="mb-4 animate-fade-in-left">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter project name"
                                defaultValue={singleProjectData?.name}
                                key={Date.now()}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"

                            />
                        </div>
                        <div className="avatar">
                            <div className="w-12 ">
                                <img key={Date.now()} className="rounded-full" src={singleProjectData?.img} />
                            </div>
                        </div>

                        {/* Image Field */}
                        <div className="mb-4 animate-fade-in-right">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                Image
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                            />
                        </div>

                        {/* URL Field */}
                        <div className="mb-4 animate-fade-in-left">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                                Project URL
                            </label>
                            <input
                                type="text"
                                id="url"
                                name="url"
                                defaultValue={singleProjectData.url}
                                key={Date.now()}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                            />
                        </div>

                        {/* Documentation Field */}
                        <div className="mb-4 animate-fade-in-right">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentation">
                                Documentation
                            </label>
                            <textarea
                                id="documentation"
                                placeholder="Enter project documentation"
                                name="documentation"
                                key={Date.now()}
                                defaultValue={singleProjectData.documentation}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                                rows="4"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                            >
                                Update Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                loder && (<div>
                    <SpinnerLoader></SpinnerLoader>
                </div>
                )
            }
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}

export default ProjectUpdate
