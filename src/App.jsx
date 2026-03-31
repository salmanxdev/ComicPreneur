import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Objectives from './components/Objectives';
import Outcomes from './components/Outcomes';
import Speaker from './components/Speaker';
import WorkshopStructure from './components/WorkshopStructure';
import Register from './components/Register';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Objectives />
      <Outcomes />
      <Speaker />
      <WorkshopStructure />
      <Register />
      <Footer />
    </div>
  );
}

export default App;