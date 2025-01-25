import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [closeMenuSubmenu, setCloseMenuSubmenu] = useState(false);

  const timeoutRef = useRef(null); // Ref to store the timeout ID

  // Handle mouse enter for Menu submenu
  const handleMenuSubmenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout if the mouse re-enters
    }
    setActiveSubmenu('menu');
    setCloseMenuSubmenu(false);
  };

  // Handle mouse leave for Menu submenu with a delay
  const handleMenuSubmenuLeave = () => {
    setCloseMenuSubmenu(true);
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null); // Hide the submenu after a delay
      setCloseMenuSubmenu(false);
    }, 300);
  };

  const menuItems = {
    dishes: { label: 'Dishes', path: '/Dishes' },
    drinks: { label: 'Drinks', path: '/Drinks' },
    desserts: { label: 'Desserts', path: '/Desserts' },
  };

  return (
    <div className={`fixed top-16 left-0 right-0 bg-white shadow-lg menu-container ${onClose ? 'closing' : ''}`}>
      <div className="container mx-auto px-4 py-6 flex">
        {/* Main Menu */}
        <div className="w-48 space-y-2">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-black hover:bg-black hover:text-white transition-colors rounded-lg"
          >
            <span className="font-medium">Home</span>
          </button>

          {/* Wrap the button and submenu in a single container */}
          <div
            onMouseEnter={handleMenuSubmenuEnter}
            onMouseLeave={handleMenuSubmenuLeave}
          >
            <button
              className="w-full flex items-center gap-2 px-4 py-3 text-black hover:bg-black hover:text-white transition-colors rounded-lg"
            >
              <span className="font-medium">Menu</span>
            </button>

            {/* Submenu */}
            {activeSubmenu === 'menu' && (
              <div
                className={`ml-8 pl-8 border-l submenu ${closeMenuSubmenu ? 'closing' : ''}`}
              >
                <div className="space-y-2">
                  {Object.entries(menuItems).map(([key, { label, path }]) => (
                    <Link
                      key={key}
                      to={path}
                      className="w-48 flex items-center gap-2 px-4 py-3 text-black hover:bg-black hover:text-white transition-colors rounded-lg"
                    >
                      <span className="font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-black hover:bg-black hover:text-white transition-colors rounded-lg"
          >
            <span className="font-medium">About</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;