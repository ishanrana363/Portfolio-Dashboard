
import { Helmet } from 'react-helmet-async';
import blogStore from '../../apiRequest/blog-api/blogStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateAlert } from './../../helper/updateAlert';
import { updateBlogApi } from '../../apiRequest/blog-api/blogApi';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import SpinnerLoader from '../full-screen-loder/Spinner';
const UpdateBlog = () => {
  const { id } = useParams();
  const { totalBlogDataApi, singleBlogDataApi, singleBlogData } = blogStore();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      setLoader(true);
      await singleBlogDataApi(id);
      setLoader(false);
    })()
  }, [id])
  const updateBlogData = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    const description = e.target.description.value;
    let payload = {
      name,
      url,
      description
    };
    let resp = await updateAlert(payload);
    if (resp.isConfirmed) {
      setLoader(true)
      let res = await updateBlogApi(id, payload);
      setLoader(false);
      if (res) {
        Swal.fire({
          title: "Update!",
          text: "Your Blog has been update successfully.",
          icon: "success"
        });
        await totalBlogDataApi();
      } else {
        toast.error("Blog update failed")
      }
    }
    e.target.reset(); // Reset the form after submission
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | Blog Update Page</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">({singleBlogData.name})Blog Update Form</h2>

          <form onSubmit={updateBlogData} >
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Blog Name
              </label>
              <input
                type="text"
                name='name'
                defaultValue={singleBlogData?.name}
                key={Date.now()}
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog name"
              />
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                Blog URL
              </label>
              <input
                type="url"
                name='url'
                defaultValue={singleBlogData?.url}
                id="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog URL"
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name='description'
                defaultValue={singleBlogData?.description}
                key={Date.now()}
                id="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a brief description"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {
        loader && (
          <div>
            <SpinnerLoader></SpinnerLoader>
          </div>
        )
      }
      <Toaster position='top-center' />
    </div>
  )
}

export default UpdateBlog
