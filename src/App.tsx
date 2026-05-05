import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import DitherBackground from "./components/CursorDither";
import DitherReveal from "./components/DitherReveal";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Photography from "./pages/Photography";
import "./App.css";

function App() {
  const location = useLocation();
  const isPhotography = location.pathname === "/photography";

  // showReveal is only true when actively transitioning to/from photography
  // — never on direct navigation (first render)
  const [showReveal, setShowReveal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const prevPathRef = useRef(location.pathname);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const prev = prevPathRef.current;
    const curr = location.pathname;
    prevPathRef.current = curr;

    if (curr === "/photography" && prev !== "/photography") {
      setRevealKey(k => k + 1);
      setShowReveal(true);
      setIsExiting(false);
    } else if (curr !== "/photography" && prev === "/photography") {
      setIsExiting(true);
    }
  }, [location.pathname]);

  const handleRevealExit = () => {
    setShowReveal(false);
    setIsExiting(false);
  };

  return (
    <div className="bg-[#1A1C1A] min-h-screen text-[#ECDFCC] font-lora">
      <DitherBackground visible={!isPhotography} />
      {showReveal && (
        <DitherReveal
          key={revealKey}
          isExiting={isExiting}
          onExitComplete={handleRevealExit}
        />
      )}
      <div className="relative z-[3]">
        <Navbar lightMode={isPhotography || (showReveal && !isExiting)} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
