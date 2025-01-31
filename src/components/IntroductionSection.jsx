import React, { useRef } from "react";
import { motion } from "framer-motion";

const IntroductionSection = () => {
  const ref = useRef(null);

  // Variants
  const containerVariants = {
    initial: { opacity: 0, y: 75 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
      },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.75,
        delay: 3.5
      },
    },
  };

  return (
    <section ref={ref} className="flex flex-row justify-center my-10">
      <motion.div
        className="bg-slate-100 rounded-3xl w-[105rem] h-[45rem] grid grid-cols-2"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }} // Keeps triggering when in view
      >
        <div className="flex flex-col items-start justify-center pl-10">
          <h1 className="text-6xl font-bold">
            Finally, an indirect ophthalmoscope designed for comfort and convenience.
          </h1>
          <p className="text-3xl text-slate-800 mt-4">
            Hakumoo Labs came about out of a simple desire to build a more affordable indirect ophthalmoscope. Our efforts to realize that goal culminated in the Haku-01.
          </p>
          <motion.div
            variants={buttonVariants}
            className="bg-purple-400 w-5/12 h-14 flex self-center items-center justify-center -ml-10 rounded-full pb-1 mt-8"
          >
            <button className="text-2xl font-bold">About Hakumoo Labs</button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroductionSection;
