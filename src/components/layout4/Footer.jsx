// 📍 src/components/layout4/Footer.jsx

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ setShowRegister }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-anim", 
        { 
          y: 40, 
          opacity: 0, 
          scale: 0.95,
          visibility: "hidden"
        },
        { 
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%", // Trigger slightly earlier for footer elements
            toggleActions: "play reverse play reverse"
          },
          y: 0, 
          opacity: 1, 
          scale: 1,
          visibility: "visible",
          duration: 0.8,
          stagger: 0.1, // Rapid successive fire
          ease: "back.out(1.5)" // Aggressive comic elasticity
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-wrapper" ref={footerRef}>
      
      {/* Sharp Yellow Comic Geometric Slant Cut */}
      <div className="footer-cutout-top"></div>
      
      <div className="footer-content">
        
        {/* Left Column: Brand Identity */}
        <div className="footer-brand">
          <h2 className="footer-logo footer-anim">COMICPRENEUR</h2>
          <p className="footer-slogan footer-anim">Where Code Meets the Comic Strip</p>
          <p className="footer-subtext footer-anim">Join the ultimate intersection of AI, creativity, and startup culture. Your origin story begins here.</p>
        </div>

        {/* Center Column: Quick Links (No Heading) */}
        <div className="footer-links">
          <ul>
            <li className="footer-anim"><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="comic-link">The Mission</a></li>
            <li className="footer-anim"><a href="#speaker" onClick={(e) => handleNavClick(e, '#speaker')} className="comic-link">Meet the Speaker</a></li>
            <li className="footer-anim"><a href="#activities" onClick={(e) => handleNavClick(e, '#activities')} className="comic-link">Activities Hub</a></li>
            <li className="footer-anim"><span className="comic-link" style={{ cursor: 'pointer' }} onClick={() => setShowRegister(true)}>Secure your Spot</span></li>
          </ul>
        </div>

        {/* Right Column: Social Nodes */}
        <div className="footer-socials">
          <h3 className="footer-heading footer-anim">CONTACT US</h3>
          
          <div className="social-pills footer-anim">
            <a href="mailto:ecell@jnctbhopal.ac.in" className="social-pill" title="Email Us">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="tel:+917974211542" className="social-pill" title="Call Us">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ecell_jnctbhopal?igsh=ZGlsMWh2d3BtNG4z" className="social-pill" title="Instagram">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/e-cell-jnct-bhopal/" className="social-pill" title="LinkedIn">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1CjdoJK3ED/" className="social-pill" title="Facebook">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        
      </div>

      {/* Classic Comic Warning Tape Divider Strip */}
      <div className="footer-warning-tape-container">
        <div className="footer-warning-tape-animated"></div>
      </div>

      {/* Bottom Legal / Copyright Signature Bar */}
      <div className="footer-bottom">
        <p>COPYRIGHT © 2026 COMICPRENEUR EVENT | AN INITIATIVE BY JAI NARAIN COLLEGE OF TECHNOLOGY (JNCT), BHOPAL.</p>
      </div>
      
    </footer>
  );
};

export default Footer;