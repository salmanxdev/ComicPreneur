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

      {/* 🤝 Partners */}
      <div className="hero-partners" ref={partnersRef}>
        <img src="/assets/JNCT_logo_white.webp" alt="JNCT" className="partner-logo jnct-logo" />
        <img src="/assets/ecell_JNCT.webp" alt="JNCT E-Cell" className="partner-logo ecell-jnct-logo" />
        <span className="partner-x">X</span>
        <img src="/assets/ecell_LNCTS.webp" alt="E-Cell LNCTS" className="partner-logo ecell-lncts-logo" />
        <img src="/assets/LNCT_logo_white.webp" alt="LNCT" className="partner-logo lnct-logo" />
      </div>

      {/* 🧩 Logo */}
      <div className="hero-logo-container">
        <div className="comic-title-container">

          <div className="thunder-container left">
            <Thunder direction="left" />
          </div>

          <img
            src="/assets/logo.webp"
            alt="Comicpreneur"
            ref={logoRef}
            className="main-logo-img"
          />

          <div className="thunder-container right">
            <Thunder direction="right" />
          </div>

        </div>
      </div>

      {/* 🔘 FIXED BUTTON */}
      <button
        className="register-btn"
        ref={btnRef}
        onMouseEnter={handleBtnEnter}
        onMouseLeave={handleBtnLeave}
        onClick={() => setShowRegister(true)}
      >
        <span className="btn-text" data-text="register now">
          register now
        </span>
      </button>

    </section>
  );
};

export default Hero;