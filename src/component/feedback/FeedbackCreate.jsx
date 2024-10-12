import { useState, useEffect } from "react";
import { uploadImg } from "../../upload-img/UploadImg";
import { feedbackCreateApi } from "../../apiRequest/feedback-api/feedbackApi";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../full-screen-loder/Spinner";

const FeedbackCreate = () => {
    const [loader, setLoader] = useState(false);

    // Scroll to top when the component loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submitFeedback = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const feedback = e.target.feedback.value;

        let feedbackImg = "";
        if (img) {
            feedbackImg = await uploadImg(img);
        }

        const payload = {
            name,
            img: feedbackImg,
            feedback,
        };

        setLoader(true);
        const res = await feedbackCreateApi(payload);
        setLoader(false);

        if (res) {
            toast.success("Feedback created successfully");
        } else {
            toast.error("Feedback creation failed");
        }

        e.target.reset(); // Reset the form after submission
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        Submit Feedback
                    </h1>

                    <form onSubmit={submitFeedback} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Image Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="img"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                name="img"
                                id="img"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Feedback Input */}
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="feedback"
                            >
                                Feedback
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                placeholder="Enter your feedback"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            {loader && <SpinnerLoader />}

            <Toaster position="top-center" />
        </div>
    );
};

export default FeedbackCreate;
