import React from 'react';
import './Speaker.css';
import speakerImage from '../assets/speaker.jpg';

const Speaker = () => {
  return (
    <section className="speaker">
      <h2>Meet the Speaker</h2>
      <img src={speakerImage} alt="Kamalakkannan Durairaju" />
      <p><strong>Mr. Kamalakkannan Durairaju</strong></p>
      <p>Founder & Chief Storyteller, Naadan Comics</p>
      <p>
        Innovative storyteller, AI artist, and entrepreneur from Chennai. Creator of the world’s first "Live Comics" format and designer of Runway Deck experiential learning system.
      </p>
    </section>
  );
};

export default Speaker;