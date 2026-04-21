// src/components/layout4/Register.jsx

import './Register.css';
import React, { useEffect, useRef } from "react";
import gsap from 'gsap';

const Register = ({ onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // ❌ Registration Closed
  const isRegistrationOpen = false;

  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(modalRef.current,
      { scale: 0.95, opacity: 0, filter: "blur(4px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current,
      { scale: 0.95, opacity: 0, filter: "blur(4px)", duration: 0.3, ease: "power2.in" }
    );

    gsap.to(overlayRef.current,
      { opacity: 0, duration: 0.3, onComplete: onClose }
    );
  };

  return (
    <div className="register-overlay" ref={overlayRef}>
      <div className="register-modal" ref={modalRef}>

        <button className="comic-close-btn" onClick={handleClose}>X</button>

        <div className="register-header-box">
          <h2 className="register-comic-title">SECURE YOUR SPOT!</h2>
        </div>

        {/* 🚫 CLOSED NOTICE */}
        {!isRegistrationOpen && (
          <div style={{
            background: "#ff4d4d",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            🚫 Registrations are now CLOSED!
          </div>
        )}

        {/* 🔁 CONDITIONAL RENDER */}
        {isRegistrationOpen ? (
          <form className="comic-register-form">
            {/* (Form removed because closed) */}
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <h2 style={{ marginBottom: "10px" }}>🚫 Registrations Closed</h2>
            <p style={{ fontSize: "14px", color: "#db2828" }}>
              Thank you for your interest in ComicPreneur 🚀 <br />
              Stay tuned for upcoming events and opportunities!
            </p>

            <button
              onClick={handleClose}
              className="comic-submit-btn"
              style={{ marginTop: "20px" }}
            >
              CLOSE
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Register;