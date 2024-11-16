import React, { useEffect, useState } from "react";
import { uploadImg } from "../../upload-img/UploadImg";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { updateStack } from "../../apiRequest/stack-api/stackApi";
import { Toaster } from "react-hot-toast";
import SpinnerLoader from "../../component/full-screen-loder/Spinner";
import useAxiosPublic from "../../hook/UseAxiosHook";
const axiosPublic = useAxiosPublic();

const UpdateStackPage = () => {
    const { id } = useParams();
    const [stack, setStack] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tinyDescription, setTinyDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchStackData = async () => {
        try {
            const response = await axiosPublic.get(`/single-stack/${id}`);
            setStack(response.data);
            setTinyDescription(response.data.description);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to fetch stack data",
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStackData();
    }, [id]);

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

    const handleDescriptionChange = (value) => {
        setTinyDescription(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.files[0];
        setLoading(true);

        const categories = form.categories.value;
        const name = form.name.value;
        const img = form.img.value;
        const description = tinyDescription;
        const video = form.video.value;

        try {
            // Upload new image if selected, otherwise keep the existing one
            let stack_img_url = stack?.img;
            if (image) {
                stack_img_url = await uploadImg(image);
            }

            const updatedProjectData = {
                stack_img_url,
                categories,
                name,
                img,
                description,
                video,
            };

            const res = await updateStack(id, updatedProjectData);
            if (res) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Stack Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchStackData();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to update stack",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }

        form.reset();
    };

    if (isLoading) {
        return <SpinnerLoader />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Update Stack</title>
            </Helmet>
            <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Update stack</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="categories" className="text-gray-700 font-bold mb-2">Categories</label>
                            <input
                                type="text"
                                id="categories"
                                name="categories"
                                defaultValue={stack?.categories}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter categories name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={stack?.name}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
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

                    <div className="mb-4">
                        <label htmlFor="video" className="text-gray-700 font-bold mb-2">Video URL</label>
                        <input
                            type="url"
                            id="video"
                            name="video"
                            defaultValue={stack.video}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Video URL"
                        />
                    </div>

                    <div className="p-2 w-full mb-10 h-full">
                        <div className="relative">
                            <label className="leading-7 text-sm font-bold text-gray-600">Description</label>
                            <Editor
                                apiKey="skupslsqi0fmj0896sym31pgszkyl2m25468z8pp5ul8gr1r"
                                init={{
                                    height: 500,
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | numlist bullist",
                                }}
                                value={tinyDescription}
                                onEditorChange={handleDescriptionChange}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>

            {loading && <SpinnerLoader />}
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default UpdateStackPage;
