import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { fadeIn } from "../../variants";
import CountUp from "react-countup";

const Hero = () => {
  const [hasLoaded, setHasLoaded] = useState(true);

  useEffect(() => {
    // Set hasLoaded to true after the component has mounted
    if (hasLoaded) {
      setHasLoaded(false);
    }
  }, [hasLoaded]); // Empty dependency array ensures this runs only once on mount
  return (
    <div className=" bg-gradient-to-b from-green-900 to-green-500 h-[320px] border-gray-800 position-relative w-full">
      <div className="text-white flex justify-between">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial={hasLoaded ? "hidden" : false} // Initial state based on hasLoaded
          animate={hasLoaded ? "show" : false} // Animate only after hasLoaded is true
          viewport={{ once: true, amount: 0.5 }}
          exit="hidden"
          className="text-white font-bold  flex font-DM text-5xl mt-14 flex-col ml-14 "
        >
          <div>Time </div>
          <div> to live</div> <div>for yourself</div>
        </motion.div>
        <div className="my-28 flex gap-10 font-DM text-lg font-bold mr-4">
          <div className="grid">
            <span className="text-2xl">
              <CountUp end={77} /> <span>+</span>
            </span>
            <span className="secondaryText font-DM text-base">Awards Winning</span>
          </div>
          <div className="grid">
            <span className="text-2xl">
              <CountUp start={100} end={500} duration={4} /> <span>+</span>
            </span>
            <span className="secondaryText text-base">Happy Customer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
