import {React, useState, useRef} from "react";
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

    const [{user, loginShow, cartShow, cartItems}, dispatch] = useStateValue()

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [closeMenu, setCloseMenu] = useState(false);

    const timeoutRef = useRef(null); // Ref to store the timeout ID

    const toggleMenu = () => {
        if(isMenuVisible){
            setCloseMenu(true);
            setTimeout(() => {
                setIsMenuVisible(false);
                setCloseMenu(false);
            }, 300);
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Clear the timeout if the mouse re-enters
                }
            setIsMenuVisible(true);
        }
    }

    const showLoginWindow = () => {
        dispatch({
            type: actionType.SET_LOGIN_SHOW,
            loginShow: !loginShow,
        });
    }
    
    const logout = () => {
        dispatch({
            type: actionType.SET_LOGOUT
        });
    }

    const showCart = () => {
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow: !cartShow,
            })
    }

    return (

        <header className="fixed z-20 w-screen h-auto p-3 px-4 md:p-6 md:px-16 bg-white">
        {/* Desktop View */}
            <div className="hidden md:flex w-full items-center justify-between mb-4">

                {/* Display Menu button */}
                <motion.div whileTap={{scale: 0.6}}>
                    <TfiViewList className={`{cursor-pointer ${isMenuVisible ? "spin-forward" : ""} ${closeMenu ? "spin-backward" : ""}`}
                     onMouseEnter={toggleMenu}
                     />
                </motion.div>

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
                            src={default_avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
                            alt="userprofile"
                            onClick={showLoginWindow}
                        />
                    </div>
                </div>

                {/* Menu */}
                {isMenuVisible && (<Menu className="absolute bottom-1" onClose={closeMenu}/>)}
            </div>

        {/* Mobile View */}
            
        </header>
    )
};