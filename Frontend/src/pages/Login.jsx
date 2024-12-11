import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Get user by email from the backend
            const response = await axios.get(`http://localhost:3000/user/${email}`);
            const user = response.data.user;

            if (user.password === password) {
                alert('Login successful!');
                navigate('/'); // Redirect to homepage
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('User not found');
            } else {
                setError('An error occurred while logging in');
            }
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to the Register page
    };

    return (
        <div className="flex justify-center items-center h-screen bg-lime-100">
            <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-lime-600 text-white py-2 rounded hover:bg-lime-700"
                    >
                        LOGIN
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">Don't have an account?</p>
                    <button
                        onClick={handleRegister}
                        className="text-lime-600 hover:underline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
