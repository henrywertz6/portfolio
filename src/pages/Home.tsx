import { motion, type Variants } from "framer-motion";
import About from "../components/About";
import Projects from "../components/Projects";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function Home() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <About />
      <Projects />
    </motion.main>
  );
}
