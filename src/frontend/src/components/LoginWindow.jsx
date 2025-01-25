import React, { useState } from 'react';
import { actionType } from "../context/reducer";

const LoginWindow = ({ onClose, onSubmit, isLoggedIn, dispatch }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, isLogin });
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_LOGOUT
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center relative 
        popoutWindow hover:scale-105 active:scale-95">
        <button 
          className="absolute top-4 right-4 text-xl popoutWindow hover:scale-105 active:scale-95" 
          onClick={onClose}
        >
          X
        </button>
        
        <h2 className="text-2xl font-semibold mb-6">
          {isLoggedIn ? 'Welcome Back!' : 'Welcome !'}
        </h2>
        
        {!isLoggedIn ? (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mb-4 p-3 rounded border border-gray-300 popoutWindow hover:scale-105 active:scale-95"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-6 p-3 rounded border border-gray-300 popoutWindow hover:scale-105 active:scale-95"
            />
            <button
              type="submit"
              className="text-black py-3 rounded hover:bg-gray-100 popoutWindow hover:scale-105 active:scale-95"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full text-black py-3 rounded hover:bg-red-100 
            popoutWindow hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        )}

        {!isLoggedIn && (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-blue-500 hover:underline popoutWindow hover:scale-105 active:scale-95"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginWindow;

