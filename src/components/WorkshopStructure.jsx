import React from 'react';
import './WorkshopStructure.css';

const WorkshopStructure = () => {
  const schedule = [
    "Opening",
    "Workshop Part-I: Panel Session",
    "Activity: Build a Startup in 5 mins",
    "Lunch Break",
    "Workshop Part-II: Runway Card Game",
    "Questionnaire and Student Showcase",
    "Activity: Startup Scribble",
    "Closing"
  ];

  const highlights = [
    "Innovation Puzzle Station",
    "Silent Startup Wall",
    "Comic Theme - Photo Booth"
  ];

  return (
    <section className="workshop-structure">
      <h2>Workshop Structure</h2>
      <ul>
        {schedule.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <h3>Other Highlights</h3>
      <ul>
        {highlights.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </section>
  );
};

export default WorkshopStructure;