// 📍 src/components/Speaker.jsx

import "./Speaker.css";

const Speaker = () => {
  return (
    <section className="speaker">

      <div className="speaker-container">
        
        <img src="/assets/speaker.png" alt="speaker" />

        <div className="speaker-text">
          <h3>About Speaker</h3>
          <p>
            - About Speaker: 
Kamalakkannan Durairaju is an innovative storyteller, AI artist, and entrepreneur from Chennai.

He is the Founder and Creative Director of Script Factory and Naadan Comics, and the creator of the world’s first “Live Comics” format, which uniquely combines human creativity, storytelling, and AI-powered workflows. 

Kamalakkannan is also the designer of the Runway Deck, an experiential learning system that brings creativity and innovation into fields like cybersecurity, finance, agriculture, startups, and science. 

His work has been showcased at prestigious platforms such as Razorpay FTX, Cypher AI Summit, GAFX, ProWine, and IIT Bombay / IITs / VIT events. 

He is the recipient of the Minsky Award for the Most Innovative AI Startup of the Year, recognizing his groundbreaking work at the intersection of AI, creativity, and storytelling.

With a background in Visual Communication from Loyola College, Chennai, and experience as a screenwriter, marketing professional, and creative consultant, he continues to inspire audiences by blending technology, art, and imagination.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Speaker;