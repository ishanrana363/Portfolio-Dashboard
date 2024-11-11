import React from 'react'
import toast from 'react-hot-toast';
import { forgotPasswordApi } from '../../apiRequest/forgetPasswordApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ForgetPasswordFormPage = () => {
    window.scrollTo(0, 0);
    const [loader, setLoader] = React.useState(false);
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const otp = e.target.otp.value;
        const password = e.target.password.value;
        const payload = {
            email,
            otp,
            password
        };
        if(!email){
            toast.error('Please enter a valid email');
            return;
        }else if(!otp){
            toast.error('Please enter OTP');
            return;
        }else if (!password){
            toast.error('Please enter a password');
            return;
        }else{
            setLoader(true);
            const res = await forgotPasswordApi(payload);
            setLoader(false);
            if(res){
                navigate("/")
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Password reset successfully",
                    showConfirmButton: false,
                    timer: 1500,
                })
            }else{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to reset password",
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
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
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Login Form</h2>

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

                    <div className="space-y-1">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

