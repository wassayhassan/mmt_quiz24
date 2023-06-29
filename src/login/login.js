import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASELINE, AFTER_LOGIN } from "../util/index";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ onLogin }) => {
    const { savelogin, user } = useContext(UserContext);
    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(BASELINE + 'user/login', formData);
             savelogin(response.data);
            setFormData({
                email: '',
                password: '',
            });
            onLogin();
            navigate("/");
        } catch (error) {
            window.alert("Please double check the login information.")
        }
    };

    return (
        <div className="pt-[120px] pl-[20%] pr-[20%] items-center h-screen bg-[#232323]">
            <div className="rounded text-white">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="bg-[#232323] hover:bg-white hover:text-black text-white border border-white hover:shadow-outline-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>

                        <Link to="/signup" className="text-white underline">
                            Signup for Free
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignInForm;
