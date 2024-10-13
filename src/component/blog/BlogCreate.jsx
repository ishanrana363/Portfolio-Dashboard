import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { createAlert } from '../../helper/createAlert';
import { createBlogApi } from '../../apiRequest/blog-api/blogApi';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import SpinnerLoader from '../full-screen-loder/Spinner';

const BlogCreate = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateURL = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z0-9][-a-z0-9]*[a-z0-9])?\\.)+[a-z]{2,}|'+ // domain name
      'localhost|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|'+ // IP address
      '\\[?[a-f0-9]*:[a-f0-9:%.~+\\/?=]+\\])'+ // IPv6
      '(\\:[0-9]+)?(\\/[-a-z0-9+&@#\/%?=~_|!:,.;]*[a-z0-9+&@#\/%=~_|])?$','i'); // path
    return !!urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL validation
    if (!validateURL(formData.url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Show confirmation alert on submit
    const resp = await createAlert();

    // Proceed with API call only if confirmed
    if (resp.isConfirmed) {
      setLoading(true);
      let res = await createBlogApi(formData);
      setLoading(false);

      if (res) {
        Swal.fire({
          title: "Created!",
          text: "Your Blog has been created successfully.",
          icon: "success"
        });
        
        setFormData({ name: '', url: '', description: '' });
      } else {
        toast.error("Blog was not created successfully");
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter blog name"
              required
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
              value={formData.url}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a valid URL"
              required
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
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a description"
              rows="4"
              required
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
      <Toaster position='top-center'/>
    </div>
  );
}

export default BlogCreate;
