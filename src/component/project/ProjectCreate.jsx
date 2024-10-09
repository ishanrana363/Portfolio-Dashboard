import toast from "react-hot-toast";
import { createProjectApi } from "../../apiRequest/projectApi";
import { uploadImg } from "../../upload-img/UploadImg";


const ProjectCreate = () => {


    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        
        const name = e.target.name.value;
        const img = e.target.img.files[0];
        const url = e.target.url.value;
        const documentation = e.target.documentation.value;
        
        let ImageUrl = '';

        if (!img?.name) {
            ImageUrl = ''
        } else {
            ImageUrl = await uploadImg(img);
        }

        let payload = {
            name,
            img : ImageUrl,
            url,
            documentation
        };

        let res = await createProjectApi (payload);

        if (res) {
            toast.success("created successfully")
        } else {
            toast.error("failed to create");
        }

        e.target.reset();
    }
    
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>

                    <form onSubmit={handleFormSubmit} >
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
                                placeholder="Enter image URL"
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
        </div>
    )
}

export default ProjectCreate
