import { useEffect, useState } from "react";
import projectStore from "../../apiRequest/project-api/projectStore"
import { useParams } from "react-router-dom";
import SpinnerLoader from "../full-screen-loder/Spinner";


const ProjectUpdate = () => {
    const { singleProjectDataApi, singleProjectData } = projectStore();
    const [loder, setLoder] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            setLoder(true);
            await singleProjectDataApi(id);
            setLoder(false);
        })()
    }, [id]);

    const handleUpdate = (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const url = e.target.url.value;
        const documentation = e.target.documentation.value;
        let imageURL = '';
        if(img){
            imageURL = await uploadImg(img);
        }
        


    }
    return (
        <>
            <div>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg animate-zoom-in">
                    <h2 className="text-2xl font-semibold text-center mb-4"> ({singleProjectData.name}) Update Project</h2>
                    <form>
                        {/* Name Field */}
                        <div className="mb-4 animate-fade-in-left">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name = "name"
                                placeholder="Enter project name"
                                defaultValue={singleProjectData?.name}
                                key={Date.now()}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div className="avatar">
                            <div className="w-12 ">
                                <img key={Date.now()} className="rounded-full" src= {singleProjectData?.img} />
                            </div>
                        </div>

                        {/* Image Field */}
                        <div className="mb-4 animate-fade-in-right">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="img"
                                name ="img"
                                placeholder="Enter image URL"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                                required
                            />
                        </div>

                        {/* URL Field */}
                        <div className="mb-4 animate-fade-in-left">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                                Project URL
                            </label>
                            <input
                                type="url"
                                id="url"
                                name ="url"
                                defaultValue={singleProjectData.url}
                                key={Date.now()}
                                placeholder="Enter project URL"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                                required
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
                                name ="documentation"
                                key={Date.now()}
                                defaultValue={singleProjectData.documentation}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
                                rows="4"
                                required
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
        </>
    )
}

export default ProjectUpdate
