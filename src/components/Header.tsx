import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Header is only solid when at the very top (scrollY === 0)
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Calculate position accounting for header height (64px)
      const headerHeight = 64;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const getCurrentPage = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/tools":
        return "Tools";
      case "/about":
        return "About";
      case "/contact":
        return "Contact";
      default:
        return "Home";
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-400"
      : "text-white hover:text-yellow-400 transition-colors";

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 shadow-lg shadow-yellow-500/20" : "bg-transparent shadow-none"}`}
    >
      {/* Site title */}
      <NavLink
        to="/"
        className="font-constitution text-2xl tracking-wide text-yellow-400"
      >
        Liberty Toolkit
      </NavLink>

      {/* Current page indicator and hamburger menu */}
      <div className="flex items-center space-x-4">
        <span className="text-yellow-400 font-bold text-lg hidden md:block">
          {getCurrentPage()}
        </span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Dropdown */}
      <nav
        className={`absolute right-6 rounded shadow-lg transition-all duration-300 ease-in-out overflow-hidden transform z-50 ${isMenuOpen ? "top-[64px] bg-black/90 opacity-100 max-h-96 p-6 translate-y-0" : "top-[64px] bg-black/90 opacity-0 max-h-0 p-0 -translate-y-4"}`}
      >
        <ul className="space-y-4 text-lg">
          <li>
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection("mission");
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Mission
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection("tools");
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Tools
            </button>
          </li>
          <li>
            <NavLink
              to="/about"
              className={navLinkClasses}
              onClick={() => {
                setIsAboutOpen(true);
                setIsMenuOpen(false);
              }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Join
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={navLinkClasses}
              onClick={() => {
                setIsContactOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Modals with AnimatePresence */}
      {isAboutOpen && <About />}
      {isContactOpen && <Contact />}
    </header>
  );
}
