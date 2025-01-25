// About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="w-full bg-black text-white py-10 px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-xl leading-relaxed">
          Born in the heart of New York City in 2012, Food90 revolutionized the way urban dwellers experience food delivery. 
          We're not just a delivery service; we're a culinary connection that brings the city's most delectable dishes directly to your doorstep.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Locally Crafted</h3>
            <p>Partnering with New York's finest local restaurants and chefs.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
            <p>Delivering hot, fresh meals in under 30 minutes, guaranteed.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quality Assured</h3>
            <p>Rigorous selection of premium ingredients and restaurant partners.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;