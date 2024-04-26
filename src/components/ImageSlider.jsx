import React, { useState, useEffect} from 'react';
import kebab from '../imgs/kebab.jpg'
import pizza from '../imgs/pizza.jpg'
import tacos from '../imgs/tacos.jpeg'


const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    pizza,
    tacos,
    kebab,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <img src={images[currentImageIndex]} class="object-cover h-48 w-96 ..."/>
      <button
        className="relative bottom-3 left-7 z-10 bg-black text-white px-4 py-2 rounded"
      >
        Order Now
      </button>
    </div>
  );
};

export default ImageSlider;
