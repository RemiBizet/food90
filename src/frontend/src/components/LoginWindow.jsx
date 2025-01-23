import React, { useState } from 'react';

// Window where the user is logging in
const LoginWindow = ({ onClose, onSubmit }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // When the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password, isLogin});
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full text-center relative">

                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>X</button>
                <h2 className="text-2xl font-semibold mb-6">Welcome !</h2>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mb-4 p-3 rounded border border-gray-300 "
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mb-6 p-3 rounded border border-gray-300 "
                    />

                    <button
                        type="submit"
                        className=  "text-black py-3 rounded "
                    >

                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                {/* Is the user trying to log in or register an account ? */}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </button>

            </div>
        </div>
    );
};

export default LoginWindow;

