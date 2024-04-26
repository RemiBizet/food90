import React, { useState } from 'react';
import {Link} from "react-router-dom"


const Menu = () => {
  const [showMenuOptions, setShowMenuOptions] = useState(false);

  const handleMenuClick = () => {
    setShowMenuOptions(true);
  }; 

  const handleMenuMouseLeave = () => {
    if (showMenuOptions) setShowMenuOptions(false);
  };
  
  return (
    <div className='flex gap-3 w-41 bg-gray-50 shadow-xl rounded-lg px-4 py-2'>
      <Link to={"/"}>
        <span className="text-textColor text-base">Home</span>
      </Link>
      <div onClick={handleMenuClick}>
        <span className="text-textColor text-base">Menu</span>
        {showMenuOptions && (
          <div onMouseLeave={handleMenuMouseLeave}>
            <Link to={"/Dishes"}><div className="text-textColor text-base">Dishes</div></Link>
            <Link to={"/Drinks"}><div className="text-textColor text-base">Drinks</div></Link>
            <Link to={"/Desserts"}><div className="text-textColor text-base">Desserts</div></Link>
          </div>
        )}
      </div>
      <div> 
        <span className="text-textColor text-base">About</span>
      </div>
    </div>
  );
};

export default Menu;
