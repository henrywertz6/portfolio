const CLOUD = "dptk0ugkg";

export function cloudinaryUrl(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_${width},q_auto,f_auto/${publicId}`;
}

export const photos: { id: string; alt: string; w: number; h: number }[] = [
  { id: "IMG_8054_vs6gpb",   alt: "", w: 2075, h: 3130 },
  { id: "IMG_7907_xrqsju",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_8049_mziseo",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_8043_tx2xgo",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_7914_cemfai",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_7907_2_yyidql", alt: "", w: 3097, h: 2053 },
  { id: "IMG_8052_olrnrr",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_7899_gbvckb",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_7604_sjzmxq",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_7580_sulque",   alt: "", w: 3130, h: 2075 },
  { id: "IMG_8050_z7xr1h",   alt: "", w: 2075, h: 3130 },
];

export const projects = [
  // {
  //   title: "Portfolio Website",
  //   subtitle: "idk what to put yet",
  //   description: "A simple portfolio website.",
  //   image: "",
  //   skills: ["React", "Typescript", "Tailwind CSS"],
  // },
  {
    title: "GameSave",
    subtitle: "iOS App",
    description:
      "GameSave is a social video game logging app. Currently being developed for iOS. React web app planned next.",
    image: "/gamesave.webp",
    skills: [
      "Swift",
      "SwiftUI",
      "Firebase",
      "Python",
      "JavaScript",
      "PostgreSQL",
      "FastAPI",
    ],
  },
  {
    title: "Street Fighter 6 API",
    subtitle: "Comprehensive frame data RESTful API",
    description:
      "A comprehensive RESTful API that provides access to detailed Street Fighter 6 frame data.",
    image: "/sf6characters_1_25.webp",
    skills: ["Python", "FastAPI", "Selenium"],
  },
  {
    title: "TigerStudies",
    subtitle: "Responsive Web App",
    description:
      "TigerStudies was an app designed to help Princeton students find other Princeton students to study with.",
    image: "/tigerstudies.png",
    skills: ["HTML", "CSS", "JavaScript", "SQLAlchemy", "Flask", "Python"],
  },
];
