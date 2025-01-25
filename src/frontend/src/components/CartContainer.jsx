import React from 'react';
import { RiRefreshFill } from 'react-icons/ri';
import {AnimatePresence, motion} from "framer-motion";
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { useEffect } from 'react';

// Cart View
const CartContainer = () => {

    const [{ user, cartItems }, dispatch] = useStateValue();
    const Subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const Total = Subtotal + 2

    const fetchCart = async (username) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username})
            });

            const data = await response.json();
            dispatch({
              type: 'SET_CART_ITEMS',
              payload: data.cart
            });
            console.log('Cart fetched:', data.cart);

        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    
    // If user is logged in, fetch the Cart
    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]); 

    // add or remove item using the api
    const addItemToCart = async (item, username) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, item }),
            });

            const data = await response.json();

            dispatch({
                type: 'SET_CART_ITEMS',
                payload: data.cart
            });

            console.log('Item added to cart:', item);

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeItemFromCart = async (item, username) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, item })
            });

            const data = await response.json();
            dispatch({
              type: 'SET_CART_ITEMS',
              payload: data.cart
            });
            console.log('Item removed from cart:', item);

        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const confirmOrder = () => {
        // Clean the cart
        dispatch({
            type: 'SET_CLEAN_CART'
        });

        dispatch({
            type: 'SET_CONFIRM_ORDER_SHOW',
            confirmOrderShow: true
        });

        setTimeout(() => dispatch({
            type: 'SET_CONFIRM_ORDER_SHOW',
            confirmOrderShow: false
        }), 2000);
    };

    return (
        <motion.div initial={{opacity: 0, x:200}}
        animate={{opacity: 1, x:0}}
        exit={{opacity: 0, x:200}}
        className='absolute top-24 h-[calc(100vh-10rem)] min-h-px[900px] bottom-24 z-10 right-0 w-75 bg-black drop-shadow-md flex flex-col rounded-l'>
            
            <div className='w-full flex items-center justify-between p-4 cursor-pointer'>

                <p className='text-white text-lg font-semibold pl-3'>Your Cart</p>

                {/* Clear item list button */}
                <motion.p whileTap={{scale: 0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base'>
                    Clear 
                    <RiRefreshFill/>
                </motion.p>
            </div>

            {/* List of items */}
            <div className='w-full h-full bg-white rounded-l flex flex-col'>

                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>

                    {cartItems && 
                        cartItems.map(item => (
                            <div key={item.itemId} className='w-full p-1 px-2 rounded-lg bg-cartItem text-white flex items-center gap-2'>
                                <h2 text-white >{item.title}</h2>
                                <p>{item.price}</p>
                                <BiMinus onClick={() => removeItemFromCart(item, user.username)}></BiMinus>
                                <p>{item.quantity}</p>
                                <BiPlus onClick={() => addItemToCart(item, user.username)}></BiPlus>
                            </div>
                        ))
                    }

                    {/* Prices */}
                        <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                            <div className='w-full flex items-center justify-between'>
                                <p className='text-white text-lg'>SubTotal</p>
                                <p className='text-white text-lg'>{Subtotal.toFixed(2)}</p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p className='text-white text-lg'>Delivery</p>
                                <p className='text-white text-lg'>2 Eur</p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p className='text-white text-xl font-semibold'>Total</p>
                                <p className='text-white text-xl font-semibold'>{Total.toFixed(2)}</p>
                            </div>

                            {/* Order Button */}
                            <button 
                                onClick={() => confirmOrder()} 
                                className='w-full p-2 mt-5 rounded-lg bg-white text-black text-lg font-semibold hover:bg-gray-300'>
                                Order
                            </button>

                    </div>
                </div>
            </div>
        </motion.div>
    )
    }

export default CartContainer;