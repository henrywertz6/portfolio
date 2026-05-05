import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  return (
    <section className="container mx-auto px-10 pt-40 pb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto text-center"
      >
        <motion.p variants={item} className="text-[#ECDFCC]/50 text-sm tracking-widest uppercase mb-4">
          Software Engineer
        </motion.p>
        <motion.h1 variants={item} className="text-5xl sm:text-6xl font-medium mb-6 leading-tight">
          Hi, I'm Henry.
        </motion.h1>
        <motion.p variants={item} className="text-[#ECDFCC]/70 text-lg leading-relaxed mb-10">
          I'm a software engineer at Amazon in Seattle. I studied Computer Science
          at Princeton. I also make music and take photos.
        </motion.p>
        <motion.div variants={item} className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/henry-wertz-09938b178/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#ECDFCC] bg-[#697565] border-0 py-2.5 px-7 rounded hover:bg-[#7a8975] transition-colors duration-200 text-sm tracking-wide"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/henrywertz6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#ECDFCC] bg-[#2e302e] border border-[#ECDFCC]/10 py-2.5 px-7 rounded hover:bg-[#383a38] transition-colors duration-200 text-sm tracking-wide"
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
