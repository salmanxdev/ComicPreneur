import React from 'react';
import './Objectives.css';

const Objectives = () => {
  const objectives = [
    "Introduce students to AI-assisted creativity as a startup enabler.",
    "Demonstrate how AI accelerates idea validation, prototyping, and MVP development.",
    "Show role of human creativity + AI in solving real-world problems.",
    "Foster entrepreneurial mindset via game-driven creative simulations.",
    "Encourage teamwork, rapid experimentation, and problem-solving.",
    "Expose students to startup & creative-tech career opportunities."
  ];

  return (
    <section className="objectives">
      <h2>Workshop Objectives</h2>
      <ul>
        {objectives.map((obj, index) => <li key={index}>{obj}</li>)}
      </ul>
    </section>
  );
};

export default Objectives;