import { motion, type Variants } from "framer-motion";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function Music() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="max-w-md"
      >
        <div className="text-5xl mb-6 select-none">♪</div>
        <h1 className="text-3xl mb-4 font-medium">Music</h1>
        <p className="text-[#ECDFCC]/60 leading-relaxed">
          Something's coming here. Check back soon.
        </p>
      </motion.div>
    </motion.main>
  );
}
