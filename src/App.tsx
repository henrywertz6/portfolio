import "./App.css";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  return (
    <body className=" bg-[#1E201E] min-h-screen text-[#ECDFCC] font-lora">
      {/* <Navbar /> */}
      <About />
      <Projects />
      {/* <Contact /> */}
    </body>
  );
}

export default App;
