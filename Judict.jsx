import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createProjectApi } from "../../apiRequest/project-api/projectApi";
import { uploadImg } from "../../upload-img/UploadImg";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import projectStore from "../../apiRequest/project-api/projectStore";
import JoditEditor from "jodit-react";

const ProjectCreate = () => {
    const { totalProjectDataApi } = projectStore();
    const [loader, setLoader] = useState(false);
    const [documentation, setDocumentation] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const url = e.target.url.value;

        let ImageUrl = "";
        if (img) {
            ImageUrl = await uploadImg(img);
        }

        let payload = {
            name,
            img: ImageUrl,
            url,
            documentation
        };

        setLoader(true);

        let res = await createProjectApi(payload);
        setLoader(false);

        if (res) {
            setLoader(true);
            await totalProjectDataApi(1, 5, 0);
            toast.success("Created successfully");
            navigate("/dashboard/all-projects");
        } else {
            toast.error("Failed to create");
        }

        e.target.reset();
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Project Create</title>
            </Helmet>
            <div className="relative">
                <div className="flex items-center justify-center bg-gray-100">
                    <div className="w-full bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-2 gap-2">
                                {/* Name Field */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>

                                {/* Image Field */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="img">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        id="img"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            {/* URL Field */}
                            <div className="w-1/2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
                                        URL
                                    </label>
                                    <input
                                        type="text"
                                        id="url"
                                        name="url"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="Enter URL"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Documentation Field with JoditEditor */}
                            <div className="flex justify-center mb-4">
                                <div className="w-full">
                                    <label className="block text-center font-bold mb-2" htmlFor="documentation">
                                        Documentation
                                    </label>
                                    <JoditEditor
                                        value={documentation}
                                        onBlur={(newContent) => {
                                            // Use regular expressions to remove all HTML tags but keep text formatting like bold and italic
                                            const formattedText = newContent.replace(/<\/?[^>]+(>|$)/g, "");
                                            setDocumentation(formattedText);
                                        }}
                                        config={{
                                            height: 500,
                                            width: 1000,
                                            toolbar: [
                                                ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', '|', 'unorderedlist', 'orderedlist'],
                                                ['outdent', 'indent', '|', 'alignment', 'undo', 'redo']
                                            ],
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Loader Spinner */}
                {loader && <SpinnerLoader />}

                <Toaster position="top-center" reverseOrder={false} />
            </div>

            {/* Render plain text content */}
            <div className="documentation-content">
                <pre>{documentation}</pre> {/* Render plain text without HTML tags */}
            </div>
        </>
    );
};

export default ProjectCreate;
