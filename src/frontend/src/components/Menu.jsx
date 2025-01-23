import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Options Menu
const Menu = () => {
  const [showMenuOptions, setShowMenuOptions] = useState(false);

  const handleMenuClick = () => {
    setShowMenuOptions(true);
  }; 

  const handleMenuMouseLeave = () => {
    if (showMenuOptions) setShowMenuOptions(false);
  };
  
  return (
    <div className='flex gap-8 bg-gray-50 shadow-xl rounded-lg px-4 py-2'>
      {/* Home Link */}
      <Link to={"/"}>
        <span className="text-textColor text-base">Home</span>
      </Link>

      {/* Menu with dropdown */}
      <div className="relative">
        <span 
          className="text-textColor text-base cursor-pointer"
          onClick={handleMenuClick}
        >
          Menu
        </span>

        {showMenuOptions && (
          <div 
            className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg"
            onMouseLeave={handleMenuMouseLeave}
          >
            <Link to={"/Dishes"}>
              <div className="text-textColor text-base px-4 py-2 hover:bg-gray-100">Dishes</div>
            </Link>
            <Link to={"/Drinks"}>
              <div className="text-textColor text-base px-4 py-2 hover:bg-gray-100">Drinks</div>
            </Link>
            <Link to={"/Desserts"}>
              <div className="text-textColor text-base px-4 py-2 hover:bg-gray-100">Desserts</div>
            </Link>
          </div>
        )}
      </div>

      {/* About Link */}
      <Link to={"/about"}>
        <span className="text-textColor text-base">About</span>
      </Link>
    </div>
  );
};

export default Menu;