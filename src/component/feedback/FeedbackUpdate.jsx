import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import feedbackStore from '../../apiRequest/feedback-api/feedbackStore';
import { useParams } from 'react-router-dom';
import SpinnerLoader from '../full-screen-loder/Spinner';
import { updateAlert } from '../../helper/updateAlert';
import { feedbackUpdateApi } from '../../apiRequest/feedback-api/feedbackApi';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImg } from '../../upload-img/UploadImg';

const FeedbackUpdate = () => {
    const [loader, setLoader] = useState(false);
    const { id } = useParams();
    const { totalFeedbackDataApi, singleFeedbackDataApi, singleFeedbackData } = feedbackStore();
    const { img: incomingImg } = singleFeedbackData;

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            await singleFeedbackDataApi(id);
            setLoader(false);
        };
        fetchData();
    }, [id, singleFeedbackDataApi]);

    const updateFeedback = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const feedback = e.target.feedback.value;

        let feedbackImg = incomingImg;
        if (img?.name) {
            feedbackImg = await uploadImg(img);
        }

        const payload = {
            name,
            feedback,
            img: feedbackImg,
        };

        const resp = await updateAlert(payload);
        if (resp.isConfirmed) {
            setLoader(true);
            const res = await feedbackUpdateApi(id, payload);
            setLoader(false);

            if (res) {
                await totalFeedbackDataApi(1, 5, 0);
                toast.success("Feedback updated successfully!");
            } else {
                toast.error("Failed to update feedback!");
            }

            e.target.reset();
        }
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Feedback Update</title>
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        ({singleFeedbackData?.name}) Feedback Update
                    </h1>

                    <form onSubmit={updateFeedback} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={singleFeedbackData?.name}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Current Image Display */}
                        <div className="avatar mb-4">
                            <img
                                className="w-12 h-12 rounded-full"
                                src={singleFeedbackData?.img || '/path/to/default/image.jpg'}
                                alt="Current Feedback Image"
                            />
                        </div>

                        {/* Image Input */}
                        <div>
                            <label
                                htmlFor="img"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Feedback Input */}
                        <div>
                            <label
                                htmlFor="feedback"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Feedback
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                defaultValue={singleFeedbackData?.feedback}
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
                            Update Feedback
                        </button>
                    </form>
                </div>
            </div>
            {loader && (
                <div>
                    <SpinnerLoader />
                </div>
            )}
            <Toaster position="center-top" />
        </div>
    );
};

export default FeedbackUpdate;
