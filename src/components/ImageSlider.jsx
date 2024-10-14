import React, { useState, useEffect } from 'react';
import kebab from '../imgs/kebab.jpg';
import pizza from '../imgs/pizza.jpg';
import tacos from '../imgs/tacos.jpeg';

// Component containing the image slider

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const images = [pizza, tacos, kebab];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);  // Start fading out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true); // Start fading in
      }, 500); // 500ms fade out duration
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
  <div className="relative overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Food Slide"
        className={`w-100 h-100 transition-opacity duration-500 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default ImageSlider;