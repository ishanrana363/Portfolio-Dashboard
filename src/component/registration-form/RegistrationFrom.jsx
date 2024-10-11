
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Toaster } from 'react-hot-toast';
import { uploadImg } from '../../upload-img/UploadImg';
import Swal from 'sweetalert2';
import { createAccount } from './../../apiRequest/admin-api/adminApi';
import { useState } from 'react';
import SpinnerLoader from '../full-screen-loder/Spinner';
import { Helmet } from 'react-helmet-async';

function RegistrationForm() {
    const [loader,setLoader] = useState(false);

    const navigate = useNavigate();
    // Framer Motion animation variants for the form zoom-in effect
    const formVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    };

    // Variants for input fields (fade in from left or right)
    const fadeInFromLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const fadeInFromRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic here
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        let img = e.target.img.files[0];

        let ImageUrl = '';

        if (!img?.name) {
            ImageUrl = ''
        } else {
            ImageUrl = await uploadImg(img);
        }
        const payload = { name, email, password, img: ImageUrl };
        setLoader(true);
        let res = await createAccount(payload);
        setLoader(false);
        if (res) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Success",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login")
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Registration Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
        e.target.reset();
    };

    return (
        <>
        <Helmet>
            <title> Dashboard | Registration </title>
        </Helmet>
            <div className="flex justify-center items-center h-screen bg-sideBarColor ">
                {/* Animate the form container with zoom-in effect */}
                <motion.form
                    className="bg-gray-100 p-6 rounded shadow-md w-96"
                    initial="hidden"
                    animate="visible"
                    variants={formVariant}
                    onSubmit={handleFormSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>

                    {/* Name Input - Fade in from left */}
                    <motion.div className="mb-4" initial="hidden" animate="visible" variants={fadeInFromLeft}>
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </motion.div>

                    {/* Email Input - Fade in from right */}
                    <motion.div className="mb-4" initial="hidden" animate="visible" variants={fadeInFromRight}>
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

                    {/* Password Input - Fade in from left */}
                    <motion.div className="mb-4" initial="hidden" animate="visible" variants={fadeInFromLeft}>
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    {/* Image Upload Input - Fade in from right */}
                    <motion.div className="mb-6" initial="hidden" animate="visible" variants={fadeInFromRight}>
                        <label className="block text-gray-700 mb-2" htmlFor="img">
                            Profile Image:
                        </label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Register
                    </motion.button>

                    {/* Already have an account - Login Link */}
                    <div className="mt-4">
                        <p className="text-center text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to="/"
                                className="text-indigo-500 hover:text-indigo-600 transition duration-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.form>
                {
                    loader && (
                        <div>
                            <SpinnerLoader></SpinnerLoader>
                        </div>
                    )
                }
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default RegistrationForm;
