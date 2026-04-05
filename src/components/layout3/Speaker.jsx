import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Speaker.css";

gsap.registerPlugin(ScrollTrigger);

const Speaker = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".speaker-animate", 
        { 
          y: 60, 
          opacity: 0,
          visibility: "hidden"
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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

    return () => ctx.revert();
  }, []);

  return (
    <section className="speaker" id="speaker" ref={sectionRef}>

      <div className="speaker-container">

        {/* ✅ IMAGE + TEXT BOX */}
        <div className="speaker-image-box speaker-animate">
          <img src="/assets/speaker.png" alt="speaker" className="speaker-image" />

          <div className="speaker-image-text">
            <h4>Mr. Kamalakkannan Durairaju</h4>
            <p>Founder & Chief Storyteller</p>
            <p>Naadan Comics</p>
          </div>
        </div>

        {/* ✅ TEXT CONTENT */}
        <div className="speaker-text">
          <h3 className="speaker-animate speaker-heading">About Speaker</h3>
          
          <p className="speaker-animate speaker-paragraph">
            Kamalakkannan Durairaju is an innovative storyteller, AI artist, and entrepreneur from Chennai.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            He is the Founder and Creative Director of Script Factory and Naadan Comics, and the creator of the world’s first “Live Comics” format.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            His work spans across cybersecurity, finance, agriculture, startups, and science.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            He has been featured at Razorpay FTX, Cypher AI Summit, GAFX, ProWine, IITs, and VIT.
          </p>
          
          <p className="speaker-animate speaker-paragraph">
            He is a Minsky Award winner for Most Innovative AI Startup.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Speaker;