import { useState } from "react";
import { projects } from "../data";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  skills: string[];
}

export default function Projects() {
  return (
    <div
      id="projects"
      className="relative overflow-hidden dark:text-[#ECDFCC] dark:bg-[#1E201E] text-center"
    >
      <h1 className="text-3xl mb-8">Projects</h1>
      <div className="flex flex-wrap gap-8 justify-center px-4">
        {projects.map((project: Project, index: number) => (
          <div
            key={index}
            className="text-center dark:bg-[#3C3D37] rounded-lg text-xl w-80 overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                className="w-full h-full object-cover"
                alt={project.title}
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl mb-3">{project.title}</h2>
              <p className="mb-4 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 text-xs rounded-full bg-[#697565]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* <img
              src={project.image}
              className="mx-auto w-full h-auto max-w-md max-h-96 rounded-2xl hover:drop-shadow-lg"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
