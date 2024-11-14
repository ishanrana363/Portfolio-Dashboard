import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createProjectApi } from "../../apiRequest/project-api/projectApi";
import { uploadImg } from "../../upload-img/UploadImg";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { Helmet } from "react-helmet-async";
import { createAlert } from "../../helper/createAlert";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

const ProjectCreate = () => {
    const [imageUrl, setImageUrl] = useState(null); // State to hold the image URL

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
            const uploadedImageUrl = await uploadImg(file);
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        img: "",
        url: "",
        documentation: "",
    });

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, documentation: value });
    };

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const img = form.img.files[0];
        setLoading(true);

        let imgUrl = "";
        if (img?.name) {
            imgUrl = await uploadImg(img);
        }

        formData.img = imgUrl;

        const resp = await createAlert();

        if (resp.isConfirmed) {
            setLoading(true);
            let res = await createProjectApi(formData);
            setLoading(false);

            if (res) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Project Submitted Successfully ",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Reset formData and image preview after successful submission
                setFormData({
                    name: "",
                    img: "",
                    url: "",
                    documentation: "",
                });
                setImageUrl(null); // Reset the image preview state

                // Reset the file input field
                form.reset(); // This is important for clearing the file input

            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to submit project",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

        // Reset formData and imageUrl manually if the form is not submitted successfully
        setFormData({
            name: "",
            img: "",
            url: "",
            documentation: "",
        });
        setImageUrl(null); // Reset the image preview state
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Project Create</title>
            </Helmet>
            <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Project</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name and Image Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="img" className="text-gray-700 font-bold mb-2">Image</label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                onChange={handleImageUpload}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Display the uploaded image immediately after it's selected */}
                    {imageUrl && (
                        <div className="mb-4">
                            <span className="text-gray-700">Selected Image:</span>
                            <img
                                src={imageUrl}
                                alt="Uploaded"
                                className="mt-2 max-w-full h-auto rounded-md border"
                            />
                        </div>
                    )}

                    {/* URL Field */}
                    <div className="mb-4">
                        <label htmlFor="url" className="text-gray-700 font-bold mb-2">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter URL"
                            required
                        />
                    </div>

                    {/* Documentation Field */}
                    <div className="p-2 w-full mb-10 h-full">
                        <div className="relative">
                            <label className="leading-7 text-sm font-bold text-gray-600">Blog Description</label>
                            <Editor
                                apiKey='skupslsqi0fmj0896sym31pgszkyl2m25468z8pp5ul8gr1r' // Use your own TinyMCE API key
                                init={{
                                    height: 500,
                                    max_height: "500",
                                    width: '100%',
                                    border: "0px",
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                }}
                                value={formData.documentation}
                                onEditorChange={handleDescriptionChange}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-white animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        ></path>
                                    </svg>
                                    <span>Submitting...</span>
                                </div>
                            ) : "Submit"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Loader Spinner */}
            {loading && <SpinnerLoader />}

            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default ProjectCreate;
