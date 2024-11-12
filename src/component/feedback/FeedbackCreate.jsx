import { useState, useEffect } from "react";
import { uploadImg } from "../../upload-img/UploadImg";
import { feedbackCreateApi } from "../../apiRequest/feedback-api/feedbackApi";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor

const FeedbackCreate = () => {
    const [loader, setLoader] = useState(false);
    const [feedback, setFeedback] = useState(''); // State for feedback

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submitFeedback = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const img = e.target.img.files[0];

        let feedbackImg = "";
        if (img) {
            feedbackImg = await uploadImg(img);
        }

        const payload = {
            name,
            img: feedbackImg,
            feedback, // Use TinyMCE feedback content
        };

        setLoader(true);
        const res = await feedbackCreateApi(payload);
        setLoader(false);

        if (res) {
            toast.success("Feedback created successfully");
        } else {
            toast.error("Feedback creation failed");
        }

        e.target.reset();
        setFeedback(''); // Reset feedback after submission
    };

    return (
        <div>
            <div className=" bg-gray-100 flex items-center justify-center">
                <div className="w-full  bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        Submit Feedback
                    </h1>

                    <form onSubmit={submitFeedback} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4" >
                            {/* name input field */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 shadow-md  "
                                    required
                                />
                            </div>
                            {/* img input field */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="img">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    className="w-full p-3  border-gray-300 rounded-lg focus:outline-none focus:ring-2 shadow-md border "
                                />
                            </div>
                        </div>

                        {/* Feedback Input with TinyMCE */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="feedback">
                                Feedback
                            </label>
                            <Editor
                                apiKey="ft8b9n0p6proa9uo99fmuupk57m4o74ou59wozlhw1ktb79c" // Replace with your TinyMCE API key if needed
                                value={feedback}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: ['link', 'lists', 'code'],
                                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | code',
                                }}
                                onEditorChange={(content) => setFeedback(content)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="  text-white p-3 rounded-lg bg-sideBarColor transition duration-300"
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
