import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Thunder from './Thunder';
import "./Hero.css";

const Hero = ({ setShowRegister }) => {
  const logoRef = useRef(null);
  const btnRef = useRef(null);
  const partnersRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(partnersRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1)", delay: 0.1 }
    );

    gsap.fromTo(logoRef.current,
      { y: -50, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power2.inOut",
        delay: 0.2
      }
    );

    gsap.to(logoRef.current, {
      y: -10,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1.0
    });

    gsap.fromTo(btnRef.current, 
      { y: 30, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1)", delay: 0.8 }
    );

    gsap.fromTo(btnRef.current,
      { rotation: -2 },
      { rotation: 2, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5 }
    );

  }, []);

  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { 
      scale: 1.05, 
      duration: 0.1, 
      boxShadow: "6px 6px 0px #000",
      x: -3, 
      y: -3
    });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { 
      scale: 1, 
      duration: 0.1, 
      boxShadow: "3px 3px 0px #000",
      x: 0,
      y: 0
    });
  };

  return (
    <section className="hero" id="about">
      
      {/* Collab Organizers Hub */}
      <div className="hero-partners" ref={partnersRef}>
        <img src="/assets/ecell_JNCT.png" alt="E-Cell LNCTS" className="partner-logo lncts-logo" />
        <span className="partner-x">X</span>
        <img src="/assets/ecell_LNCTS.png" alt="JNCT E-Cell" className="partner-logo jnct-logo" />
      </div>

      <div className="hero-logo-container">
        
        <div className="comic-title-container">
          <div className="thunder-container left">
            <Thunder direction="left" />
          </div>
          
          <img 
            src="/assets/logo.png" 
            alt="Comicpreneur" 
            ref={logoRef}
            className="main-logo-img"
          />
          
          <div className="thunder-container right">
            <Thunder direction="right" />
          </div>
        </div>

      </div>

      <button 
        className="register-btn" 
        ref={btnRef}
        onMouseEnter={handleBtnEnter}
        onMouseLeave={handleBtnLeave}
        onClick={() => setShowRegister(true)}
      >
        register now
      </button>
    </section>
  );
};

export default Hero;