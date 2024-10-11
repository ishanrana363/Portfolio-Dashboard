import toast, { Toaster } from "react-hot-toast";
import { createProjectApi } from "../../apiRequest/project-api/projectApi";
import { uploadImg } from "../../upload-img/UploadImg";
import { useState } from "react";
import FullScreenLoader from "../full-screen-loder/FullScreenLoder";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { useNavigate } from "react-router-dom";
import AwesomeSVG from "../full-screen-loder/AwesomeSVG";
import { Helmet } from "react-helmet-async";

const ProjectCreate = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const url = e.target.url.value;
        const documentation = e.target.documentation.value;

        let ImageUrl = '';
        if (!img?.name) {
            ImageUrl = ""
        }
        ImageUrl = await uploadImg(img);

        let payload = {
            name,
            img: ImageUrl,
            url,
            documentation
        };

        setLoader(true); // Show loader when form is submitted

        let res = await createProjectApi(payload);

        setLoader(false); // Hide loader after API call completes

        if (res) {
            toast.success("Created successfully");
            navigate("/dashboard/all-projects")
        } else {
            toast.error("Failed to create");
        }

        e.target.reset();
    };

    return (
        <>
        <Helmet>
            <title>Dashboard | Project Create </title>
        </Helmet>
            <div className="relative">
                <div className="flex items-center justify-center bg-gray-100 min-h-screen">
                    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>

                        <form onSubmit={handleFormSubmit}>
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

                            {/* URL Field */}
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

                            {/* Documentation Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="documentation">
                                    Documentation
                                </label>
                                <textarea
                                    id="documentation"
                                    name="documentation"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    rows="4"
                                    placeholder="Enter documentation details"
                                    required
                                />
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
                {
                    loader && (
                        <div>
                            <SpinnerLoader></SpinnerLoader>
                        </div>
                    )
                }
            </div>

            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default ProjectCreate;
