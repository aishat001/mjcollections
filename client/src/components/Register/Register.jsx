import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Full Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        }

        if (!formData.phoneNo) {
            errors.phoneNo = 'Phone Number is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post('https://mjcollections-api.onrender.com/register', formData)
                .then((response) => {
                    console.log(response.data);
                    // Handle successful registration
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error during registration
                });
        }
    };

    const handleLogin = async () => {

        navigate.push('/login');

    };

    return (
        <div className="flex flex-col items-center justify-center h-screen pt-28 mb-28">
            <form onSubmit={handleFormSubmit} className=" w-[320px] bg-white rounded-lg  px-10">
                <h2 className="text-2xl font-bold mb-6">Register</h2>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Full Name</label>
                    <input name="name" type="text" onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input name="email" type="email" onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Phone Number</label>
                    <input name="phoneNo" type="phone" onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.phoneNo && <span className="text-red-500">{errors.phoneNo}</span>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input name="password" type="password" onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>

                <button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
                >Create Account</button>
            </form>

            <button onClick={handleLogin} className="btn border-2 border-black  text-black px-5 mt-5">Login</button>
        </div>
    );
};

export default Register;
