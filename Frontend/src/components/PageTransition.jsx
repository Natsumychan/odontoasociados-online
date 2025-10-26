import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // empieza transparente y un poco abajo
      animate={{ opacity: 1, y: 0 }}    // aparece suavemente
      exit={{ opacity: 0, y: -20 }}     // desaparece hacia arriba
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
