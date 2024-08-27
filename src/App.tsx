import "./App.css";
import About from "./components/About";
import Projects from "./components/Projects";

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
