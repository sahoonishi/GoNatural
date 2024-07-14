import React from "react";

const Poster = () => {
  return (
    <div className="flex flex-row ">
      <div className=" overflow-x-scroll gap-8 hide-scroll-bar w-full ">
        <div className="flex lg:w-full lg:justify-evenly sm:justify-evenly">
          <div className="w-32">
            <img
              src="https://aromamagic.com/cdn/shop/files/Vegetarian_360x.png?v=1717672165"
              alt="image1"
            />
          </div>
          <div className="w-32">
            <img
              src="https://aromamagic.com/cdn/shop/files/Ayurvedic-enriched_360x.png?v=1717672075"
              alt="image12"
            />
          </div>
          {/* <div className="w-32">
            <img
              src="https://aromamagic.com/cdn/shop/files/not-tested-on-animals_360x.png?v=1717672016"
              alt="image13"
            />
          </div> */}
          <div className="w-32">
            <img
              src="https://aromamagic.com/cdn/shop/files/Recycled-Packaging_360x.png?v=1717672117"
              alt="image14"
            />
          </div>
          <div className="w-32">
            <img
              src="https://aromamagic.com/cdn/shop/files/essential-oil-leave_360x.png?v=1717672222"
              alt="image18"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
