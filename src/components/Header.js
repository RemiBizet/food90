import React from "react";
import Logo from "./imgs/fork_knife.jpg"
import { MdShoppingBasket} from "react-icons/md";

const Header = () => {
    return (
        <header className="fixed z-50 w_screen p-6 px-16">
        {/* Desktop and tablet */}
            <div className="hidden md:flex w-full h-hull items-center justify-between">

                <div className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo"/>
                    <p className="text-headingColor text-xl font-bold"> Food90 Delivery Service</p>
                </div>

                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-outcursor-pointer">
                            Home
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-outcursor-pointer">
                            Menu
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-outcursor-pointer">
                            About Us
                        </li>
                    </ul>

                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
                        <div className="w-10 h-10 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-sm text_white font-semibold">2</p>
                        </div>
                    </div>

                    <img
                        src={Avatar}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer"
                        alt="userprofile"
                    />
                </div>
            </div>
        </header>
    )
};
export default Header;