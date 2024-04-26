import {React, useState} from "react";
import Logo from "../imgs/fork_knife.jpg"
import {motion} from "framer-motion";
import { MdShoppingBasket,MdAdd, MdLogout} from "react-icons/md";
import default_avatar from '../imgs/default_avatar.jpg'
import {Link} from "react-router-dom"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {app} from "../firebase.config"
import { useStateValue} from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { TfiViewList } from "react-icons/tfi";
import Menu from "./Menu";

export default function Header() {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user},dispatch] = useStateValue()
    const [isLoginMenu, setIsLoginMenu] = useState(false)
    const [isMenu, setIsMenu] = useState(false)

    const displayMenu = () => {
        setIsMenu(!isMenu)
    }

    const login = async() => {
        if(!user){
            const {user : {refreshToken,providerData}}= await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0],
            })
            localStorage.setItem('user',JSON.stringify(providerData[0]))
        }else {
            setIsLoginMenu(!isLoginMenu)
        }
    };

    const logout = () => {
        setIsLoginMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    }
    return (

        <header className="fixed z-40 w-screen h-auto p-3 px-4 md:p-6 md:px-16">
        {/* Desktop and tablet */}
            <div className="hidden md:flex w-full items-center justify-between mb-4">

                <motion.div whileTap={{scale: 0.6}}><TfiViewList onClick={displayMenu}/></motion.div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo"/>
                    <p className="text-headingColor text-xl font-bold"> Food90 Delivery Service</p>
                </Link> 

                <div className="flex justify-end mr-2">

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
                            onClick={login}
                        />
                        {
                            isLoginMenu && (
                            <motion.div initial={{opacity : 0, scale : 0.6}}
                                animate={{opacity : 1, scale : 1}}
                                exit={{opacity : 0, scale : 0.6}}
                                className="w-41 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2">
                                {user && user.email == "bzt.remi@gmail.com" && 
                                (<Link to={"/createItem"}>
                                <p className="px-5 py-2 flex items-center gap-3 cursor-point hover:bg-slate-210 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd/></p>
                                </Link>)}
                                <p className="px-5 py-2 flex items-center gap-3 cursor-point hover:bg-slate-210 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={logout}>Logout <MdLogout/></p>
                            </motion.div>
                            )
                        }

                    </div>
                </div>
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
                        onClick={login}
                    />
                    {
                    isLoginMenu && (
                    <motion.div initial={{opacity : 0, scale : 0.6}}
                            animate={{opacity : 1, scale : 1}}
                            exit={{opacity : 0, scale : 0.6}}
                            className="w-41 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2">
                            {user && user.email == "bzt.remi@gmail.com" && 
                            (<Link to={"/createItem"}>
                            <p className="px-4 py-2 flex items-center gap-3 cursor-point hover:bg-slate-210 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd/></p>
                            </Link>
                            )}

                    <p className="px-4 py-2 flex items-center gap-3 cursor-point transition-all justify-center hover:bg-slate-200 duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}>Logout <MdLogout/></p>
                    </motion.div>
                    )}
                </div>
            </div>
            
        </header>
    )
};