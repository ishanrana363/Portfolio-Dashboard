import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import toast, { Toaster } from 'react-hot-toast';
import { adminLoginApi } from './../../apiRequest/admin-api/loginApi';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        let password = e.target.password.value;
        console.log(email, password);
        let payload = {
            email,
            password
        };
        let response = await adminLoginApi(payload);
        if(response){
            window.location.href = "/dashboard";
            toast.success("Login successful")
        }else{
            toast.error("Login failed")
        }
    }



    return (
        <>
            <div className="flex justify-center bg-sideBarColor items-center h-screen">
                <form onSubmit={handleSubmit}
                    className="bg-gray-100 p-6 rounded shadow-md w-80"
                    
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {/* Email Input */}
                    <div className="mb-4">
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
                    </div>

                    {/* Password Input with Toggle */}
                    <div className="mb-6">
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
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                        Login
                    </button>

                    {/* Registration Link */}
                    <div className="mt-4">
                        <p className="text-center text-gray-500">
                            Don't have an account?{' '}
                            <Link
                                to="/registration"
                                className="text-indigo-500 hover:text-indigo-600 transition duration-300"
                            >
                                Registration
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default LoginForm;
