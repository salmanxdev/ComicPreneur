import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Objectives from './components/Objectives';
import Outcomes from './components/Outcomes';
import Speaker from './components/Speaker';
import WorkshopStructure from './components/WorkshopStructure';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check URL params for admin mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      console.log("Admin mode detected");
      setIsAdmin(true);
    }
  }, []);

  // DEBUG wrapper to catch rendering errors
  try {
    // Admin view
    if (isAdmin && !isLoggedIn) {
      return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
    }

    if (isAdmin && isLoggedIn) {
      return <AdminDashboard />;
    }

    // Public landing page
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
  } catch (err) {
    console.error("Error rendering App:", err);
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Something went wrong rendering the page!</h2>
        <pre>{err.message}</pre>
      </div>
    );
  }
}

export default App;