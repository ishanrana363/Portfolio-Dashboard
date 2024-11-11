import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { forgotPasswordApi } from '../../apiRequest/forgetPasswordApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ForgetPasswordFormPage = () => {
    window.scrollTo(0, 0);
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const otp = e.target.otp.value;
        const password = e.target.password.value;
        const payload = { email, otp, password };

        if (!email) {
            toast.error('Please enter a valid email');
            return;
        } else if (!otp) {
            toast.error('Please enter OTP');
            return;
        } else if (!password) {
            toast.error('Please enter a password');
            return;
        }

        setLoader(true);
        const res = await forgotPasswordApi(payload);
        setLoader(false);

        if (res) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Password reset successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/');
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to reset password',
                showConfirmButton: false,
                timer: 1500,
            });
        }

        e.target.reset();
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Password Reset Page</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Password Reset</h2>

                    <div className="space-y-1">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter OTP"
                            required
                        />
                    </div>

                    <div className="space-y-1 relative">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter new password"
                            required
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loader}
                        className={`w-full py-2 px-4 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                            ${loader ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        {loader ? (
                            <div className="flex items-center justify-center space-x-2">
                                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordFormPage;
