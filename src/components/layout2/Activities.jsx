// 📍 src/components/layout2/Activities.jsx

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Activities.css";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { id: 1, src: "/assets/card1.png", title: "Runway: The Card Game" },
  { id: 2, src: "/assets/card2.png", title: "Build A Startup" },
  { id: 3, src: "/assets/card3.png", title: "Startup Scribble" }
];

const Activities = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [fanComplete, setFanComplete] = useState(false);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    // We use ScrollTrigger solely to detect entry, flipping the `scrolled` state.
    // This allows CSS variables to control the complex transforms natively without GSAP matrices breaking them.
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 65%",
      onEnter: () => setScrolled(true),
      onEnterBack: () => setScrolled(true),
      onLeave: () => { setScrolled(false); setFanComplete(false); },
      onLeaveBack: () => { setScrolled(false); setFanComplete(false); }
    });
  }, []);

  useEffect(() => {
    // After exactly 1 second of fanning out, gracefully remove the staggered CSS transition delay
    // This allows the Left/Right carousel arrows to natively transition instantly afterwards!
    if (scrolled) {
      const timer = setTimeout(() => {
        setFanComplete(true);
      }, 1000); // 1000ms ensures stagger finishes completely
      return () => clearTimeout(timer);
    }
  }, [scrolled]);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  return (
    <section className="activities" id="activities" ref={sectionRef}>
      
      <div className="carousel-container">
        
        <button className="carousel-arrow left-arrow" onClick={prevCard} aria-label="Previous Activity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="cards-track">
          {cardData.map((card, idx) => {
            
            // Core mapping logic
            let positionClass = "card-hidden"; // Default stack state unseen
            
            if (!scrolled) {
              positionClass = "card-stacked"; // Before scroll: tightly compressed in center
            } else {
              // Mathematical layout looping mapping 
              if (idx === activeIndex) {
                positionClass = "card-center";
              } else if (idx === (activeIndex - 1 + cardData.length) % cardData.length) {
                positionClass = "card-left";
              } else if (idx === (activeIndex + 1) % cardData.length) {
                positionClass = "card-right";
              }
            }

            // Stagger engine. Uses CSS transition-delay mapping sequentially ONLY during initial intro fan-out.
            const initialDelay = (!fanComplete && scrolled) ? `${idx * 0.15}s` : "0s";

            return (
              <img 
                key={card.id}
                src={card.src} 
                alt={card.title}
                className={`carousel-card ${positionClass}`} 
                style={{ transitionDelay: initialDelay }}
              />
            );
          })}
        </div>

        <button className="carousel-arrow right-arrow" onClick={nextCard} aria-label="Next Activity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div>
      
      <div className="carousel-dots">
        {cardData.map((_, i) => (
          <div key={i} className={`dot ${i === activeIndex ? "active" : ""}`} onClick={() => setActiveIndex(i)} />
        ))}
      </div>

      {/* Structural Divider Bottom Tab */}
      <div className="activities-divider">
        <div className="divider-left"></div>
        <div className="divider-slant-wrapper">
          <div className="divider-slant-border"></div>
          <div className="divider-slant-inner"></div>
        </div>
        <div className="divider-right">
          <h2 className="activities-title-text">ACTIVITIES</h2>
        </div>
      </div>
      
    </section>
  );
};

export default Activities;