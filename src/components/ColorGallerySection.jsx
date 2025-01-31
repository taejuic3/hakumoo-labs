import { motion } from "framer-motion";

const ColorGallerySection = () => {
  
  const containerVariants = {
    initial: { opacity: 0, y: 35 },
    animate: {
      opacity: 1, y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, y: 35 },
    animate: {
      opacity: 1, y: 0,
      transition: { duration: 1 },
    },
  };

  const photoCards = [
    { src: "https://i.poweredtemplates.com/p/sp/124027/sp_slide_h_1.jpg", alt: "Gallery 1" },
    { src: "https://i.poweredtemplates.com/p/sp/124027/sp_slide_h_1.jpg", alt: "Gallery 2" },
    { src: "https://i.poweredtemplates.com/p/sp/124027/sp_slide_h_1.jpg", alt: "Gallery 3" },
    { src: "https://i.poweredtemplates.com/p/sp/124027/sp_slide_h_1.jpg", alt: "Gallery 4" },
    { src: "https://i.poweredtemplates.com/p/sp/124027/sp_slide_h_1.jpg", alt: "Gallery 5" },
  ];
  
  const renderPhotoCards = (photoCard) => (
    <motion.div
      key={photoCard.alt}
      variants={childVariants}
    >
      <img
        className="ring-2 ring-slate-100 rounded-xl shadow-2xl"
        src={photoCard.src}
        alt={photoCard.alt}
      />
    </motion.div>
  );

  return (
    <section>
      <motion.div className="grid grid-cols-5 gap-4 p-6"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once:false }}
      >
        {photoCards.map(renderPhotoCards)}
      </motion.div>
    </section>
  );
};

export default ColorGallerySection;