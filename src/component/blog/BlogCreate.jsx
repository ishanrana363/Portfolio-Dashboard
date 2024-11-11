import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { createAlert } from '../../helper/createAlert';
import { createBlogApi } from '../../apiRequest/blog-api/blogApi';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import SpinnerLoader from '../full-screen-loder/Spinner';
import { uploadImg } from './../../upload-img/UploadImg';

const BlogCreate = () => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const img = e.target.img.files[0];
    const url = e.target.url.value;
    const description = e.target.description.value;

    let imgUrl = "";

    if (img?.name) {
      imgUrl = ""
    }
    imgUrl = await await uploadImg(img);

    const payload = {
      name,
      img: imgUrl,
      url,
      description,
    };

    if (!name) {
      toast.error("Enter blog name");
      return;
    } else if (!img) {
      toast.error("Select blog image");
      return;
    } else if (!url) {
      toast.error("Enter blog url");
      return;
    }else{
      let resp = await createAlert();
      if (resp.isConfirmed) {
        setLoading(true);
        let res = await createBlogApi(payload);
        setLoading(false);
        if (res) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Blog create successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to create blog",
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    }

  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Blog Create</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Blog Create Form</h2>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Blog Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter blog name"

            />
          </div>
          {/* img */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
              Img
            </label>
            <input
              type="file"
              id="img"
              name='img'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter blog name"

            />
          </div>

          {/* URL Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a valid URL"

            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a description"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      {loading && <SpinnerLoader />}
      <Toaster position='top-center' />
    </div>
  );
}

export default BlogCreate;


