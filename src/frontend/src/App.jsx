import {React, useReducer, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateValue} from "./context/StateProvider";
import { actionType } from "./context/reducer";
import LoginWindow from './components/LoginWindow';
import CartContainer from "./components/CartContainer.jsx";
import './App.css';
import {Dishes,Drinks,Desserts} from './data.js';
import MainContainer from './components/MainContainer';
import ProductsContainer from './components/ProductsContainer';
import About from './components/About.jsx';
import {AnimatePresence} from "framer-motion";
import Header from './components/Header'

export default function App() {

  const [{loginShow, confirmOrderShow, cartShow}, dispatch] = useStateValue()

  const showLoginWindow = () => {
    dispatch({
        type: actionType.SET_LOGIN_SHOW,
        loginShow: !loginShow
    });
  }

  const handleLoginSubmit = async ({ username, password, isLogin }) => {
    try {
        let response;
        if (!isLogin) {
            // Register the user
            response = await fetch('http://localhost:5000/api/login/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const registerData = await response.json();
            if (!registerData.success) {
                alert('Registration failed');
                return;
            }
        } else {
            // Log in the user
            response = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });

          const loginData = await response.json();

          if (loginData.token) {
              dispatch({
                  type: 'SET_LOGIN_SUCCESS',
                  payload: {
                      username: loginData.user.username,
                  },
              });
              showLoginWindow();
          } else {
              alert('Login failed');
              return;
          }

        }
    } catch (error) {
        console.error('Error processing request:', error);
    }
};

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-screen flex flex-col bg-primary">

        <Header/>

        {/* When an order is confirmed */}
        {confirmOrderShow && (
            <div className='fixed inset-0 flex items-center justify-center'>
                <div className='bg-white text-black p-4 rounded-lg shadow-lg'>
                    <p>Order successfully done!</p>
                </div>
            </div>
        )}

        {loginShow && (
                <LoginWindow
                    onClose={showLoginWindow}
                    onSubmit={handleLoginSubmit}
                />
            )}

        {/* CartContainer */}
        {cartShow && (
            <CartContainer/>
        )}

        {/* MainContainer with different routes */}
        <main className='z-5 mt-14 md:mt-24 a px-16 py-8'>
          <Routes>
                <Route exact path="/*" element={<MainContainer/>} />
                <Route exact path="/Dishes" element={<ProductsContainer products={Dishes}/>} />
                <Route exact path="/Drinks" element={<ProductsContainer products={Drinks}/>} />
                <Route exact path="/Desserts" element={<ProductsContainer products={Desserts}/>} />
          </Routes>
        </main>

        <About />
      </div>
    </AnimatePresence>
  );
}
