import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginForm = () => {
   
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formData = {
        email, password
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        // Here you can handle the login logic, such as sending a request to the backend
        // console.log('email:', email);
        // console.log('Password:', password);
        try{
            const res = await axios.post("http://localhost:4000/api/auth/login", formData)
            console.log("res", res);
            localStorage.setItem("token", res.data?.user?.token)
        
            toast.success(res.data?.message)
            navigate('/home')
        }
        catch(error){
            console.log("error while call to backend", error)
            toast.error(error.response?.data?.message)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                    <div className='mt-3'>New User -  
                        <NavLink to='/signup' className="text-blue-600"> Singup</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
