import React from 'react';
import bannerimage1 from '../../images/baner2.jpg'
import bannerimage3 from '../../images/banner3.jpg'


const Banner = () => {
    return (
        <div className="hero min-h-screen mb-8" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80")` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Good Products</h1>
            <p className="mb-5">The purpose of a product description is to supply customers with important information about the features and key benefits of the product so they're compelled to buy.</p>
           
          </div>
        </div>
      </div>
    );
};

export default Banner;