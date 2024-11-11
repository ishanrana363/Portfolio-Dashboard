import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { sendEmailApi } from '../../apiRequest/forgetPasswordApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const EmailSendFromPage = () => {
  window.scrollTo(0, 0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const payload = { email };


    if (!email) {
      toast.error(`Please enter a valid email`);
    } else {
      setLoader(true);
      const res = await sendEmailApi(payload);
      setLoader(false);
      if (res) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Email sent successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/email-verify")
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to send email",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    e.target.reset();
  };

  return (
    <div>
      <Helmet>
        <title>Send Email | Portfolio Dashboard</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Send Email
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            disabled={loader}
          >
            {loader ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin text-white inline-block"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      {
        <Toaster position='top-center' />
      }
    </div>
  );
};

export default EmailSendFromPage;




