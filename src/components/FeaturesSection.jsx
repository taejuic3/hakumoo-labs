import { motion } from "framer-motion";

const FeaturesSection = () => {
  const containerVariants = {
    initial: { opacity: 0, y: 35 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.5,
        staggerChildren: 0.3
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, y: 35 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5 }
    }
  }

  const firstFeatures = [
    {
      title: "50 grams of sleek portability. Say goodbye to cables and external battery packs.",
      imageAlt: "Portable device",
    },
    {
      title: "Recharge via USB-C for up to 8 hours of continuous run time at maximum brightness.",
      imageAlt: "Battery life",
    },
  ];

  const secondFeatures = [
    { title: "Tiltable light angle.", imageAlt: "Tiltable light" },
    { title: "Iris diaphragm for adjustable spot size.", imageAlt: "Iris diaphragm" },
    { title: "Variable brightness control.", imageAlt: "Variable brightness" },
  ];

  const renderFeature = (feature) => (
    <motion.div
      key={feature.title} // Unique key for React list rendering
      className="border-4 border-purple-500 flex flex-col items-center justify-center"
      variants={childVariants}
     >
      <img
        src="./images/sprite_moo.PNG"
        alt={feature.imageAlt}
        className="mt-4 mb-2 object-cover"
      />
      <h1 className="text-xl text-slate-800 mb-2 text-center">{feature.title}</h1>
    </motion.div>
  );

  return (
    <section className="mb-10">
      {/* First section with typing animation */}
      <motion.div
        className="text-6xl font-medium text-center mb-6"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
      >
        Pocket-sized without compromise
      </motion.div>

      {/* First feature content */}
      <motion.div className="flex flex-row justify-center"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
      >
        <div className="border-4 border-green-500 w-full grid grid-cols-2 gap-6">
          {firstFeatures.map(renderFeature)}
        </div>
      </motion.div>

      {/* Second section with typing animation */}
      <motion.div
        className="text-6xl font-medium text-center my-6"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
      >
        Ergonomic and intuitive
      </motion.div>

      {/* Second feature content */}
      <motion.div className="flex flex-row justify-center"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
      >
        <div className="border-4 border-green-500 w-full grid grid-cols-3 gap-6">
            {secondFeatures.map(renderFeature)}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
