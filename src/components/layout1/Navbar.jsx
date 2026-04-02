// 📍 src/components/Navbar.jsx

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import "./Navbar.css";

const Navbar = ({ setShowRegister }) => {
  const navbarRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Drop down entry animation for the navbar
    gsap.fromTo(navbarRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' }
    );
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { scale: 1.1, color: '#d32f2f', duration: 0.2, ease: "power1.out" });
  };
  const handleMouseLeave = (e) => {
    gsap.to(e.target, { scale: 1, color: '#000', duration: 0.2, ease: "power1.out" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Hardware-accelerated smooth scroll ensuring perfect DOM navigation regardless of CSS support
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: 'HOME', href: '#about' }, // The user requested Mission/Home map to Layout 1 (Hero)
    { label: 'SPEAKER', href: '#speaker' },
    { label: 'ACTIVITIES', href: '#activities' },
    { label: 'REGISTER', isModal: true }
  ];

  return (
    <nav className="navbar" ref={navbarRef}>
      <ul>
        {navItems.map((item, index) => (
          <li 
            key={index} 
            ref={el => itemsRef.current[index] = el}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            {item.isModal ? (
              <span onClick={() => setShowRegister(true)} style={{ cursor: "pointer", display: "block", height: "100%" }}>{item.label}</span>
            ) : (
              <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} style={{ textDecoration: 'none', color: 'inherit', display: "block", height: "100%" }}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
