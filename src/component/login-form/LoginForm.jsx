import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import toast, { Toaster } from 'react-hot-toast';
import { adminLoginApi } from './../../apiRequest/admin-api/loginApi';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from './../full-screen-loder/Spinner';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { loginAlert } from '../../helper/loginAlert';
import { setToken } from '../../helper/sessionHelper';
import Swal from 'sweetalert2';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        let password = e.target.password.value;

        let payload = {
            email,
            password
        };

        let resp = await loginAlert()
        try {
            if (resp.isConfirmed) {
                setLoader(true)
                let res = await axios.post(`https://protfillo-backend.vercel.app/api/v1/login`, payload);
                setLoader(false)
                if (res) {
                    console.log(res.data.status);
                    setToken(res.data["token"]);
                    window.location.href = "/dashboard";
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset()
                }
            }
        } catch (error) {
            setLoader(false)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to login",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <motion.div
                className="flex justify-center bg-sideBarColor items-center h-screen"
                initial={{ scale: 0.5 }} // Starts smaller (zoomed out)
                animate={{ scale: 1 }}   // Zooms in
                transition={{ duration: 0.8 }} // Animation duration
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 p-6 rounded shadow-md w-80"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>

                    {/* Email Input */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -100 }} // Starts off-screen (left)
                        animate={{ opacity: 1, x: 0 }}   // Fades in and moves to position
                        transition={{ duration: 0.6 }}   // Animation duration
                    >
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    {/* Password Input with Toggle */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, x: 100 }} // Starts off-screen (right)
                        animate={{ opacity: 1, x: 0 }}   // Fades in and moves to position
                        transition={{ duration: 0.6, delay: 0.2 }} // Delayed animation
                    >
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password:
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none"
                                onClick={handleTogglePassword}
                            >
                                {/* Toggle between eye and eye-slash icon */}
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                        initial={{ scale: 0.8 }} // Starts slightly smaller
                        animate={{ scale: 1 }}   // Scales up to full size
                        transition={{ duration: 0.3 }} // Quick animation
                    >
                        Login
                    </motion.button>
                    <div>
                        <Link className='block mt-1 hover:underline ' to={"/send-email"}>Forget Password</Link>
                    </div>

                    {/* Registration Link */}
                    <div className="mt-4">
                        <p className="text-center text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/registration"
                                className="text-indigo-500 hover:text-indigo-600 transition duration-300"
                            >
                                Registration
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
            {
                loader && (
                    <SpinnerLoader></SpinnerLoader>
                )
            }
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default LoginForm;
