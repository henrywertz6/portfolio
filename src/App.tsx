import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <body className=" dark:bg-[#1E201E] min-h-screen dark:text-[#ECDFCC] font-lora">
      {/* <Navbar /> */}
      <About />
      <Projects />
      {/* <Contact /> */}
    </body>
  );
}

export default App;
