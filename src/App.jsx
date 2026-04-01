// 📍 src/App.jsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Activities from "./components/Activities";
import Speaker from "./components/Speaker";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Activities />
      <Speaker />
      <Footer />
    </div>
  );
}

export default App;