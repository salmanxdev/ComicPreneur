// src/App.jsx

import { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/layout1/Navbar";
import Hero from "./components/layout1/Hero";
import About from "./components/layout3/About";
import Objectives from "./components/layout2/Objectives";
import Outcomes from "./components/layout2/Outcomes";
import WorkshopStructure from "./components/layout2/WorkshopStructure";
import Activities from "./components/layout2/Activities";
import Speaker from "./components/layout3/Speaker";
import Footer from "./components/layout4/Footer";
import Register from "./components/layout4/Register";

import AdminDashboard from "./components/layout4/AdminDashboard";
import AdminLogin from "./components/layout4/AdminLogin";

import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 ADMIN DETECTION
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isAdmin = params.get("admin") === "true";

  // 🔐 LOGIN FLOW
  if (isAdmin && !isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  if (isAdmin && isLoggedIn) {
    return <AdminDashboard />;
  }

  // 🌐 NORMAL WEBSITE
  return (
    <div className="app">
      <Navbar setShowRegister={setShowRegister} />
      <Hero setShowRegister={setShowRegister} />
      <About />
      <Objectives />
      <Outcomes />
      <WorkshopStructure />
      <Activities />
      <Speaker />
      <Footer setShowRegister={setShowRegister} />

      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default App;