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
    semester: "", // ✅ added
    collegeName: "",
    enrollmentNo: "",
    contactNo: "",
    email: ""
  });

  const [paymentFile, setPaymentFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [contactError, setContactError] = useState("");
  const [fileError, setFileError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNo") {
      if (/[^0-9]/.test(value)) {
        setContactError("⚠️ Only numbers allowed");
      } else if (value.length > 10) {
        return;
      } else {
        setContactError("");
      }

      setFormData(prev => ({
        ...prev,
        contactNo: value.replace(/\D/g, "")
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPaymentFile(e.target.files[0]);
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!paymentFile) {
      setFileError("⚠️ Please upload payment screenshot");
      alert("⚠️ Payment Screenshot Required!");
      hasError = true;
    }

    if (formData.contactNo.length !== 10) {
      setContactError("⚠️ Enter valid 10-digit mobile number");
      hasError = true;
    }

    if (hasError) return;

    setIsUploading(true);

    try {
      const storageRef = ref(
        storage,
        `payment_screenshots/${Date.now()}_${paymentFile.name}`
      );

      const snapshot = await uploadBytes(storageRef, paymentFile);
      const paymentUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "registrations"), {
        ...formData,
        paymentScreenshotUrl: paymentUrl,
        timestamp: new Date()
      });

      fetch("https://comic-preneur-backend.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email
        })
      })
        .then(res => res.json())
        .then(data => console.log("📧 Email response:", data))
        .catch(err => console.error("❌ Email error:", err));

      alert("Registration & Payment Proof Successfully Submitted! Boom! ⚡");

      setFormData({
        fullName: "",
        course: "",
        branch: "",
        semester: "", // ✅ reset added
        collegeName: "",
        enrollmentNo: "",
        contactNo: "",
        email: ""
      });

      setPaymentFile(null);
      handleClose();

    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Try again!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="register-overlay" ref={overlayRef}>
      <div className="register-modal" ref={modalRef}>

        <button className="comic-close-btn" onClick={handleClose}>X</button>

        <div className="register-header-box">
          <h2 className="register-comic-title">SECURE YOUR SPOT!</h2>
        </div>

        <form onSubmit={handleSubmit} className="comic-register-form">

          <input
            type="text"
            name="fullName"
            placeholder="Super Hero Name (Full Name)"
            required
            value={formData.fullName}
            onChange={handleChange}
          />

          <div className="input-group-row">
            <input
              type="text"
              name="course"
              placeholder="Course"
              required
              value={formData.course}
              onChange={handleChange}
            />

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              required
              value={formData.branch}
              onChange={handleChange}
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              required
              value={formData.semester}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="collegeName"
            placeholder="College Name / Secret Base"
            required
            value={formData.collegeName}
            onChange={handleChange}
          />

          <div className="input-group-row">
            <input
              type="text"
              name="enrollmentNo"
              placeholder="Enrollment No."
              required
              value={formData.enrollmentNo}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="contactNo"
              placeholder="Comm Link (Contact No)"
              required
              value={formData.contactNo}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

          {contactError && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {contactError}
            </p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Secure Email ID"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <div className="payment-qr-section">
            <p className="qr-title">Complete Registration Payment ⚡</p>

            <div className="qr-placeholder-box">
              <img src="/assets/payment-qr2.jpeg" alt="QR" className="payment-qr-image" />
            </div>

            <p className="qr-subtitle">Scan QR or UPI 7974211542@ybl</p>

            <p className="qr-amount">
              Registration Charge:
              <span style={{  marginLeft: "5px" }}>
                ₹100
              </span>
            </p>

            <div className="file-upload-container">
              <label htmlFor="paymentProof" className="file-upload-label">
                {paymentFile ? `FILE: ${paymentFile.name}` : "Upload Payment Screenshot"}
              </label>

              <input
                type="file"
                id="paymentProof"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-file-input"
              />
            </div>

            {fileError && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {fileError}
              </p>
            )}

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
