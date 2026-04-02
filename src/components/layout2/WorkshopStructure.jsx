import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkshopStructure.css';

gsap.registerPlugin(ScrollTrigger);

const WorkshopStructure = () => {
  const sectionRef = useRef(null);

  const schedule = [
    { title: "Opening", type: "ceremony" },
    { title: "Workshop Part-I: Panel Session", type: "session" },
    { title: "Activity: Build a Startup in 5 mins", type: "activity" },
    { title: "Lunch Break", type: "break" },
    { title: "Workshop Part-II: Runway Card Game", type: "session" },
    { title: "Questionnaire and Student Showcase", type: "showcase" },
    { title: "Activity: Startup Scribble", type: "activity" },
    { title: "Closing", type: "ceremony" }
  ];

  const highlights = [
    "Innovation Puzzle Station",
    "Silent Startup Wall",
    "Comic Theme - Photo Booth"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".timeline-line", 
        { height: 0 },
        { scrollTrigger: { trigger: ".timeline-container", start: "top 75%", end: "bottom 30%", scrub: 1 }, height: "100%", ease: "none" }
      );

      gsap.utils.toArray(".timeline-block").forEach((block, index) => {
        gsap.fromTo(block,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0, rotation: index % 2 === 0 ? -5 : 5 },
          { scrollTrigger: { trigger: block, start: "top 85%", toggleActions: "play reverse play reverse" }, x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.2)" }
        );
      });

      gsap.fromTo(".highlight-item",
        { scale: 0, opacity: 0 },
        { scrollTrigger: { trigger: ".highlights-container", start: "top 85%", toggleActions: "play reverse play reverse" }, scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "elastic.out(1, 0.4)" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="structure-section" id="schedule" ref={sectionRef}>
      <div className="structure-header">
        <h2 className="structure-title">WORKSHOP STRUCTURE</h2>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {schedule.map((step, idx) => (
          <div key={idx} className={`timeline-block ${idx % 2 === 0 ? 'left' : 'right'}`}>
            <div className={`timeline-content type-${step.type}`}>
              <div className="timeline-dot"></div>
              <h3>{idx + 1}. {step.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="highlights-container">
        <h3 className="highlights-title">OTHER HIGHLIGHTS</h3>
        <div className="highlights-grid">
          {highlights.map((hlt, idx) => (
            <div key={idx} className="highlight-item">
              <span>{hlt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WorkshopStructure;