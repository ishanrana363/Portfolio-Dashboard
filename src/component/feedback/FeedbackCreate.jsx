const FeedbackCreate = () => {

    window.scrollTo(0, 0)
    return (

        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">Submit Feedback</h1>

                    <form className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
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

                        {/* Image URL Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="img">
                                Image URL
                            </label>
                            <input
                                type="file"
                                name="img"
                                id="img"
                                placeholder="Enter image URL"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Feedback Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="feedback">
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
        </div>
    )
}

export default FeedbackCreate
