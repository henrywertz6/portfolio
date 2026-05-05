import { motion, type Variants } from "framer-motion";
import { projects } from "../data";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  skills: string[];
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 pb-32">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-12 text-[#ECDFCC]/60 tracking-widest uppercase text-sm"
      >
        Projects
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto"
      >
        {projects.map((project: Project, index: number) => (
          <motion.div
            key={index}
            variants={card}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className="bg-[#252724] border border-[#ECDFCC]/5 rounded-xl w-80 overflow-hidden group cursor-default"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            <div className="h-48 overflow-hidden">
              <motion.img
                src={project.image}
                className="w-full h-full object-cover"
                alt={project.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="p-5">
              <p className="text-[#ECDFCC]/40 text-xs tracking-wider uppercase mb-1">
                {project.subtitle}
              </p>
              <h3 className="text-lg font-medium mb-3">{project.title}</h3>
              <p className="text-[#ECDFCC]/60 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2.5 py-1 text-xs rounded-full bg-[#697565]/30 text-[#ECDFCC]/70 border border-[#697565]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
