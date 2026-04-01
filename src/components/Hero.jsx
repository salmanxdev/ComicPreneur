// 📍 src/components/Hero.jsx

import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-logo">
        <img src="/assets/lightning-left.png" className="light left" />
        
        <img src="/assets/logo.png" className="main-logo" />
        
        <img src="/assets/lightning-right.png" className="light right" />
      </div>

      <button>register now</button>

    </section>
  );
};

export default Hero;