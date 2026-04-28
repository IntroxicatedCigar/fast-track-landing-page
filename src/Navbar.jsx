import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll to change navbar background/shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll logic
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
    const element = document.getElementById(id);
    if (element) {
      // Offset by 80px to account for the fixed navbar height
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => scrollToSection("home")}>
          🏍Speedman
        </div>

        {/* Desktop & Mobile Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <button
            onClick={() => scrollToSection("services")}
            className="nav-link"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="nav-link"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-cta"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
