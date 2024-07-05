import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { fadeIn } from "../../variants";

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
      <div className="text-white flex justify-items-start">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial={hasLoaded ? "hidden" : false} // Initial state based on hasLoaded
          animate={hasLoaded ? "show" : false} // Animate only after hasLoaded is true
          viewport={{ once: true, amount: 0.9 }}
          exit="hidden"
          className="text-white font-bold  flex font-DM text-5xl mt-14 flex-col ml-20 "
        >
          <div>Time </div>
          <div> to live</div> <div>for yourself</div>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
