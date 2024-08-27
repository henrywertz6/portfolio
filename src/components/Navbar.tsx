export default function Navbar() {
  return (
    <header className="dark:bg-[#1E201E] top-0 sticky z-10">
      <div className="container mx-auto flex p-5 flex-row items-center">
        <a href="#about" className="text-xl font-medium">
          Henry Wertz
        </a>
        <nav className="mr-auto ml-8">
          <a href="#projects" className="mr-5 hover:underline">
            Projects
          </a>
          <a href="#skills" className="mr-5 hover:underline">
            Skills
          </a>
          <a href="#contact" className="mr-5 hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
