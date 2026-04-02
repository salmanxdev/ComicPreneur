// 📍 src/components/layout3/About.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Guaranteed bulletproof GSAP Context mapping to avoid Strict Mode duplication memory leaks
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate",
        {
          y: 70,
          opacity: 0,
          visibility: "hidden",
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Very early trigger map
            toggleActions: "play reverse play reverse", // Enables continuous re-triggering upon multi-directional scrolling
          },
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 1.2,
          stagger: 0.25,
          ease: "power2.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      <div className="about-content">
        <h2 className="about-title about-animate">About ComicPreneur</h2>

        <p className="about-paragraph about-animate">
          <strong>AI Tools × Human Creativity</strong> is an interactive panel + workshop experience that introduces students to AI-assisted creativity, real-time storytelling and startup-driven innovation. Through live demonstrations, rapid prototyping workflows, and a game-based creative simulation (Runway Deck), participants explore how human imagination combined with AI can build innovative products, stories, and solutions — while gaining clarity on creative-tech careers and future startup opportunities.
        </p>

        <div className="event-details about-animate">
          <p>
            <strong>Date:</strong> 16th April, 2026 (Thursday)
          </p>
          <p>
            <strong>Time:</strong> 9:00 AM to 3:30 PM
          </p>
          <p>
            <strong>Venue:</strong> Auditorium, Jai Narain College of Technology
            (JNCT), Bhopal
          </p>
          <a
            href="https://maps.app.goo.gl/xjiMi5tzjRMTkrtW7"
            target="_blank"
            rel="noopener noreferrer"
            className="location-btn"
          >
            View Location on Map
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
