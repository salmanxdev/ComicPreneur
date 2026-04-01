// 📍 src/App.jsx

import { useState } from 'react';
import Navbar from "./components/layout1/Navbar";
import Hero from "./components/layout1/Hero";
import Activities from "./components/layout2/Activities";
import Speaker from "./components/layout3/Speaker";
import Footer from "./components/layout4/Footer";
import Register from "./components/layout4/Register";

import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app">
      <Navbar setShowRegister={setShowRegister} />
      <Hero setShowRegister={setShowRegister} />
      <Activities />
      <Speaker />
      <Footer setShowRegister={setShowRegister} />
      
      {/* Absolute Cinematic Comic Modal Render Priority */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default App;