import React from 'react';
import './Outcomes.css';
const Outcomes = () => {
  const outcomes = [
    "Apply AI-powered creative tools to generate and refine startup ideas.",
    "Build and test early-stage concepts, prototypes, or narratives.",
    "Understand worldbuilding, storytelling, and gamification for startups.",
    "Make strategic decisions simulating real startup challenges.",
    "Collaborate in teams for market-ready creative solutions.",
    "Gain clarity on entrepreneurship, startup roles, and creative-tech careers."
  ];

  return (
    <section className="outcomes">
      <h2>Workshop Outcomes</h2>
      <ul>
        {outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
      </ul>
    </section>
  );
};

export default Outcomes;