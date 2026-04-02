// src/components/layout4/Register.jsx
import './Register.css';
import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Mapped corrected relative path
import gsap from 'gsap';

const Register = ({ onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    branch: "",
    collegeName: "",
    enrollmentNo: "",
    contactNo: "",
    email: ""
  });

  useEffect(() => {
    // Smooth Normal Transition Entrance
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
    // Smooth fade exit
    gsap.to(modalRef.current, { scale: 0.95, opacity: 0, filter: "blur(4px)", duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: new Date()
      });
      alert("Registration Form Successfully Submitted! Boom! ⚡");
      setFormData({
        fullName: "",
        course: "",
        branch: "",
        collegeName: "",
        enrollmentNo: "",
        contactNo: "",
        email: ""
      });
      handleClose(); // Auto-close modal on success
    } catch (err) {
      console.error(err);
      alert("Error submitting form. The servers might be under villainous attack. Try again.");
    }
  };

  return (
    <div className="register-overlay" ref={overlayRef}>
      <div className="register-modal" ref={modalRef}>
        
        {/* Absolute Top Right Cancel Box */}
        <button className="comic-close-btn" onClick={handleClose}>X</button>
        
        <div className="register-header-box">
          <h2 className="register-comic-title">SECURE YOUR SPOT!</h2>
        </div>

        <form onSubmit={handleSubmit} className="comic-register-form">
          <input type="text" name="fullName" placeholder="Super Hero Name (Full Name)" required onChange={handleChange} value={formData.fullName} />
          
          <div className="input-group-row">
            <input type="text" name="course" placeholder="Course" required onChange={handleChange} value={formData.course} />
            <input type="text" name="branch" placeholder="Branch" required onChange={handleChange} value={formData.branch} />
          </div>

          <input type="text" name="collegeName" placeholder="College Name / Secret Base" required onChange={handleChange} value={formData.collegeName} />
          
          <div className="input-group-row">
            <input type="text" name="enrollmentNo" placeholder="Enrollment No." required onChange={handleChange} value={formData.enrollmentNo} />
            <input type="text" name="contactNo" placeholder="Comm Link (Contact No)" required onChange={handleChange} value={formData.contactNo} />
          </div>

          <input type="email" name="email" placeholder="Secure Email ID" required onChange={handleChange} value={formData.email} />
          
          {/* Incoming Payment QR Layout Scaffold */}
          <div className="payment-qr-section">
            <p className="qr-title">Complete Registration Payment ⚡</p>
            <div className="qr-placeholder-box">
              <span>SCAN QR (PENDING)</span>
            </div>
            <p className="qr-subtitle">Scan via UPI to secure your spot</p>
          </div>
          
          <button type="submit" className="comic-submit-btn">REGISTER NOW</button>
        </form>
      </div>
    </div>
  );
};

export default Register;