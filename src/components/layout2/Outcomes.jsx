import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Outcomes.css';

gsap.registerPlugin(ScrollTrigger);

const Outcomes = () => {
  const sectionRef = useRef(null);

  const outcomesData = [
    { id: "O1", text: "Apply AI-powered creative tools to generate and refine startup ideas efficiently." },
    { id: "O2", text: "Build and test early-stage concepts, prototypes, or narratives using rapid AI workflows." },
    { id: "O3", text: "Understand how worldbuilding, storytelling, and gamification can strengthen startup branding and user engagement." },
    { id: "O4", text: "Make strategic decisions under constraints, simulating real startup challenges." },
    { id: "O5", text: "Collaborate in teams to develop market-ready creative solutions." },
    { id: "O6", text: "Gain clarity on entrepreneurship, startup roles, and creative-tech career pathways." }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".outcome-row").forEach((row, i) => {
        gsap.fromTo(row,
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play reverse play reverse" },
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out"
          }
        );
      });

      gsap.fromTo(".outcomes-heading-wrapper",
        { y: -30, opacity: 0 },
        { 
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
          y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" 
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="outcomes-section" id="outcomes" ref={sectionRef}>
      <div className="outcomes-heading-wrapper">
        <h2 className="outcomes-title">OUTCOMES</h2>
        <span className="outcomes-subtitle">Superpowers Unlocked</span>
      </div>
      <div className="outcomes-list">
        {outcomesData.map((outcome, idx) => (
          <div key={idx} className="outcome-row">
            <div className="outcome-badge">
              <span>{outcome.id}</span>
            </div>
            <div className="outcome-text-box">
              <p>{outcome.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Outcomes;
