// 📍 src/components/layout3/Speaker.jsx

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Speaker.css";

gsap.registerPlugin(ScrollTrigger);

const Speaker = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // React 18 Safe GSAP Context Architecture
    const ctx = gsap.context(() => {
      // Use scoped class selectors directly to avoid double-render node duplication bugs!
      gsap.fromTo(".speaker-animate", 
        { 
          y: 60, 
          opacity: 0,
          visibility: "hidden" // Force hidden prior to trigger
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Triggers generously as section enters lower screen bounds
            toggleActions: "play reverse play reverse"
          },
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup timeline securely on unmount
  }, []);

  return (
    <section className="speaker" id="speaker" ref={sectionRef}>

      <div className="speaker-container">
        <div className="speaker-card speaker-animate">
          <img src="/assets/speaker.png" alt="speaker" className="speaker-image" />
          <div className="speaker-caption">
            <h4 className="speaker-name">Mr. Kamalakkannan Durairaju</h4>
            <div className="speaker-roles">
              <p className="speaker-title">Founder & Chief Storyteller</p>
              <p className="speaker-company">Naadan Comics</p>
            </div>
          </div>
        </div>

        <div className="speaker-text">
          <h3 className="speaker-animate speaker-heading">About Speaker</h3>
          
          <p className="speaker-animate speaker-paragraph">
            Kamalakkannan Durairaju is an innovative storyteller, AI artist, and entrepreneur from Chennai.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            He is the Founder and Creative Director of Script Factory and Naadan Comics, and the creator of the world’s first “Live Comics” format, which uniquely combines human creativity, storytelling, and AI-powered workflows. 
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            Kamalakkannan is also the designer of the Runway Deck, an experiential learning system that brings creativity and innovation into fields like cybersecurity, finance, agriculture, startups, and science. 
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            His work has been showcased at prestigious platforms such as Razorpay FTX, Cypher AI Summit, GAFX, ProWine, and IIT Bombay / IITs / VIT events. 
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            He is the recipient of the Minsky Award for the Most Innovative AI Startup of the Year, recognizing his groundbreaking work at the intersection of AI, creativity, and storytelling.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            With a background in Visual Communication from Loyola College, Chennai, and experience as a screenwriter, marketing professional, and creative consultant, he continues to inspire audiences by blending technology, art, and imagination.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Speaker;