import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Objectives.css';

gsap.registerPlugin(ScrollTrigger);

const Objectives = () => {
  const sectionRef = useRef(null);
  
  const objectivesData = [
    { num: "01", icon: "»", text: "To introduce students to AI-assisted creativity as a startup enabler for building innovative products, services, and content." },
    { num: "02", icon: "»", text: "To demonstrate how AI tools can accelerate idea validation, prototyping, and MVP development in early-stage startups." },
    { num: "03", icon: "»", text: "To help participants understand the role of human creativity combined with AI in solving real-world business problems." },
    { num: "04", icon: "»", text: "To foster an entrepreneurial mindset through decision-based, game-driven creative simulations." },
    { num: "05", icon: "»", text: "To encourage team collaboration, rapid experimentation, and problem-solving, essential skills for startup environments." },
    { num: "06", icon: "»", text: "To expose students to startup and creative-tech career opportunities, including founders, creators, and product innovators." }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".objective-panel", 
        { y: 80, opacity: 0, rotate: -3 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" },
          y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
        }
      );
      
      gsap.fromTo(".obj-title-animate", 
        { scale: 0.5, opacity: 0 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
          scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="objectives" id="objectives" ref={sectionRef}>
      <div className="objectives-header">
        <h2 className="objectives-title obj-title-animate">OBJECTIVES</h2>
        <div className="obj-title-bg obj-title-animate"></div>
      </div>
      <div className="objectives-grid">
        {objectivesData.map((obj, index) => (
          <div key={index} className="objective-panel">
            <div className="obj-number">{obj.num}</div>
            <div className="obj-content">
              <span className="obj-icon">{obj.icon}</span>
              <p className="obj-text">{obj.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Objectives;
