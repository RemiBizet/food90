import {React, useState} from "react";
import Logo from "../imgs/fork_knife.jpg"
import {motion} from "framer-motion";
import { MdShoppingBasket, MdLogout} from "react-icons/md";
import default_avatar from '../imgs/default_avatar.jpg'
import {Link} from "react-router-dom"
import { useStateValue} from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { TfiViewList } from "react-icons/tfi";
import Menu from "./Menu";

// Component for the Header
export default function Header() {

    const [{user, loginShow, cartShow, cartItems},dispatch] = useStateValue()

    // Handling Different menus
    const [isLoginMenu, setIsLoginMenu] = useState(false)
    const [isMenu, setIsMenu] = useState(false)

    const displayMenu = () => {
        setIsMenu(!isMenu)
    }

    const displayLoginMenu = () => {
        setIsLoginMenu(!isLoginMenu)
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow: false,
        })
    }

    const showLoginWindow = () => {
        displayLoginMenu();
        dispatch({
            type: actionType.SET_LOGIN_SHOW,
            loginShow: !loginShow,
        });
    }
    
    const logout = () => {
        setIsLoginMenu(false);

        dispatch({
            type: actionType.SET_LOGOUT
        });
    }

    const showCart = () => {
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow: !cartShow,
            })
        setIsLoginMenu(false);
    }

    return (

        <header className="fixed z-20 w-screen h-auto p-3 px-4 md:p-6 md:px-16">
        {/* Desktop View */}
            <div className="hidden md:flex w-full items-center justify-between mb-4">

                {/* Desktop View */}
                <motion.div whileTap={{scale: 0.6}}><TfiViewList onClick={displayMenu}/></motion.div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo"/>
                    <p className="text-headingColor text-xl font-bold"> Food90 Delivery Service</p>
                </Link> 

                <div className="flex justify-end">

                    {/* Shopping Basket and Items in Cart Counter*/}
                    <div className="relative flex items-center justify-center mr-3" onClick={showCart}>
                        <MdShoppingBasket className="text-2xl cursor-pointer" />

                        {/* Items in Cart Counter */}
                        {cartItems && cartItems.length >= 0 && (
                        <div className="w-10 h-10 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-sm text-black font-semibold">{cartItems.length}</p>
                        </div>
                        )}

                        {user && (
                        <h1>{user.username}</h1>
                        )}
                    </div>

                    {/* Login Menu */}
                    <div className="relative">
                        <motion.img 
                            whileTap={{scale: 0.6}}
                            onClick={displayLoginMenu}
                            src={default_avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
                            alt="userprofile"
                        />
                        {
                            isLoginMenu && (
                            <motion.div initial={{opacity : 0, scale : 0.6}}
                                animate={{opacity : 1, scale : 1}}
                                exit={{opacity : 0, scale : 0.6}}
                                className="w-41 z-30 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2">
                                
                                <p className="px-5 py-2 flex items-center gap-3 cursor-point hover:bg-slate-210 transition-all duration-100 ease-in-out text-black text-base"
                                onClick={showLoginWindow}>Login
                                </p>

                                <p className="px-5 py-2 flex items-center gap-3 cursor-point hover:bg-slate-210 transition-all duration-100 ease-in-out text-black text-base"
                                onClick={logout}>Logout <MdLogout/>
                                </p>
                            </motion.div>
                            )
                        }

                    </div>
                </div>

            {/* Menu */}
            <motion.div initial={{opacity : 0, scale : 0.6}}
                            animate={{opacity : 1, scale : 1}}
                            exit={{opacity : 0, scale : 0.6}}
                            className="absolute bottom-1 ">{isMenu && (<Menu/>)}</motion.div>

            </div>

        {/* Mobile View */}
        <div className="flex md:hidden items-center justify-between w-full h-full">
            <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo"/>
                    <p className="text-headingColor text-xl font-bold"> Food90 Delivery Service</p>
            </Link>

            <div className="relative flex items-center justify-center">
                    <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                    <div className="w-10 h-10 rounded-full bg-cartNumBg flex items-center justify-center">
                        <p className="text-sm text_white font-semibold">2</p>
                    </div>
            </div>

            <div className="relative">
                <motion.img 
                    whileTap={{scale: 0.6}}
                    src={user ? user.photoURL : default_avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
                    alt="userprofile"
                />
                {
                isLoginMenu && (
                <motion.div initial={{opacity : 0, scale : 0.6}}
                        animate={{opacity : 1, scale : 1}}
                        exit={{opacity : 0, scale : 0.6}}
                        className="w-41 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2">
                    <p className="px-4 py-2 flex items-center gap-3 cursor-point transition-all justify-center hover:bg-slate-200 duration-100 ease-in-out text-black text-base"
                    onClick={logout}>Logout <MdLogout/></p>
                </motion.div>
                )}
            </div>
        </div>
            
        </header>
    )
};