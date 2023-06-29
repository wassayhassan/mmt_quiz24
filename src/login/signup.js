import React, { useState } from 'react';
import axios from 'axios';
import { BASELINE } from "../util/index";

const SignupPanel = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        grade: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(BASELINE + 'user/insert/info', formData);
    
          // Reset the form after successful submission
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            grade: '',
          });
        } catch (error) {
          console.error(error);
          // Handle the error if necessary
        }
      };

    return (
        <div className="pt-[120px] pl-[20%] pr-[20%] items-center h-screen bg-[#232323]">
            <div className="rounded text-white">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-[60px]'>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 bg-[#232323] text-white"
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 bg-[#232323] text-white"
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 bg-[#232323] text-white"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 bg-[#232323] text-white"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="grade">
                            School Grade
                        </label>
                        <input
                            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 bg-[#232323] text-white"
                            type="text"
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#232323] hover:bg-white hover:text-black text-white border border-white hover:shadow-outline-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPanel;
