import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { fadeIn } from "../../variants";
import CountUp from "react-countup";
import { collection } from "firebase/firestore";

const Hero = () => {
  const [hasLoaded, setHasLoaded] = useState(true);

  useEffect(() => {
    // Set hasLoaded to true after the component has mounted
    if (hasLoaded) {
      setHasLoaded(false);
    }
  }, [hasLoaded]); // Empty dependency array ensures this runs only once on mount
  return (
    <div className=" bg-gradient-to-b from-green-900 to-green-400 h-[405px] border-gray-800 position-relative w-full">
      <div className="text-white flex sm:justify-between justify-center flex-wrap">
        {/* <motion.div
          variants={fadeIn("down", 0.2)}
          initial={hasLoaded ? "hidden" : false} // Initial state based on hasLoaded
          animate={hasLoaded ? "show" : false} // Animate only after hasLoaded is true
          viewport={{ once: true, amount: 0.5 }}
          exit="hidden"
          className="text-white font-bold  flex font-DM text-5xl mt-14 flex-col ml-14 "
        >
          <div>Time </div>
          <div> to live</div> <div>for yourself</div>
        </motion.div> */}
        <motion.h1
          initial= {hasLoaded ? { y: "3rem", opacity: 0 } :false} 
          animate= {hasLoaded ? { y: 0, opacity: 1 } :false}
          transition={{
            duration: 2,
            type: "ease-in",
          }}
          className="text-white font-semibold  flex font-DM text-4xl px-5  sm:text-5xl mt-16 flex-col sm:ml-14"
        >
          <div>Time </div>
          <div> to live</div> <div>for yourself</div>

          <div className="flex sm:gap-20 sm:text-xl text-xl gap-8 font-normal  mt-10 text-gray-300 ">
            <div className="grid ">
              <span className="">
                <CountUp end={70} /> <span>+</span>
              </span>
              <span className="secondaryText font-DM grid text-xs">
                <span>Awards</span> <span className="">Winning</span>
              </span>
            </div>

    
            <div className="grid">
              <span className="">
                <CountUp start={190} end={467} duration={4} /> <span>+</span>
              </span>
              <span className="font-DM grid text-xs">
                <span>Happy</span>
                <span className="">Customer</span>
              </span>
            </div>
            <div className="grid">
              <span className="">
                <CountUp start={0} end={90} duration={2} /> <span>+</span>
              </span>
              <span className="font-DM grid text-xs">
                <span className="">Products</span>
                <span className="">count</span>
              </span>
            </div>
          </div>
        </motion.h1>
        {/* <motion.h1
          initial={{ x: "3rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 2,
            type: "ease-in",
          }}
        >
          <div className="my-5 mr-28 mx-auto sm:block block md:w-20 lg:w-96 w-20">
            <img
              className=" opacity-90"
              src="public/image/hand-drawn-cruelty-free-vegan-concept.png"
              alt=""
            />
          </div>
        </motion.h1> */}
      </div>
    </div>
  );
};

export default Hero;
