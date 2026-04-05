// src/components/layout4/Register.jsx
import './Register.css';
import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
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
  const [paymentFile, setPaymentFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPaymentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentFile) {
      alert("Please upload your payment screenshot before submitting! 🚨");
      return;
    }

    try {
      setIsUploading(true);

      const storageRef = ref(storage, `payment_screenshots/${Date.now()}_${paymentFile.name}`);
      const snapshot = await uploadBytes(storageRef, paymentFile);
      const paymentUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "registrations"), {
        ...formData,
        paymentScreenshotUrl: paymentUrl,
        timestamp: new Date()
      });

      setIsUploading(false);
      alert("Registration & Payment Proof Successfully Submitted! Boom! ⚡");
      setFormData({
        fullName: "",
        course: "",
        branch: "",
        collegeName: "",
        enrollmentNo: "",
        contactNo: "",
        email: ""
      });
      setPaymentFile(null);
      handleClose(); // Auto-close modal on success
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("Error submitting form or uploading file. The servers might be under villainous attack. Try again.");
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
              <img
                src="/assets/payment-qr.jpeg"
                alt="Payment QR code"
                className="payment-qr-image"
              />
            </div>
            <p className="qr-subtitle">Scan via UPI to secure your spot</p>
            <p className="qr-amount">Registration Charge: ₹49</p>

            <div className="file-upload-container">
              <p className="upload-title">Upload Payment Screenshot</p>
              <label htmlFor="paymentProof" className="file-upload-label">
                {paymentFile ? `FILE: ${paymentFile.name}` : "Choose payment screenshot"}
              </label>
              <input
                type="file"
                id="paymentProof"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="hidden-file-input"
              />
            </div>
          </div>
          
          <button type="submit" className="comic-submit-btn" disabled={isUploading}>
            {isUploading ? "UPLOADING PROTOCOLS... ⏳" : "REGISTER NOW"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
