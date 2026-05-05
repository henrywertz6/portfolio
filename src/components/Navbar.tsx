import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/photography", label: "Photography" },
  { to: "/music", label: "Music" },
];

interface Props {
  lightMode: boolean;
}

export default function Navbar({ lightMode }: Props) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #1A1C1Aee, transparent)",
          opacity: lightMode ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(245,240,232,0.93), transparent)",
          opacity: lightMode ? 1 : 0,
        }}
      />
      <NavLink
        to="/"
        className={`relative transition-colors duration-700 font-medium tracking-wide hover:opacity-70 ${
          lightMode ? "text-[#1A1C1A]" : "text-[#ECDFCC]"
        }`}
      >
        hw.
      </NavLink>
      <div className="relative flex gap-8 text-sm">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `transition-colors duration-700 ${
                lightMode
                  ? isActive ? "text-[#1A1C1A]" : "text-[#1A1C1A]/50 hover:text-[#1A1C1A]/80"
                  : isActive ? "text-[#ECDFCC]" : "text-[#ECDFCC]/50 hover:text-[#ECDFCC]/80"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
