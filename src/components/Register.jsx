// src/components/Register.jsx
import './Register.css';
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // make sure db is exported from firebase.js

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    branch: "",
    collegeName: "",
    enrollmentNo: "",
    contactNo: "",
    email: ""
  });

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
      alert("Registration submitted successfully!");
      setFormData({
        fullName: "",
        course: "",
        branch: "",
        collegeName: "",
        enrollmentNo: "",
        contactNo: "",
        email: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Try again.");
    }
  };

  return (
    <section id="register">
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} value={formData.fullName} />
        <input type="text" name="course" placeholder="Course" required onChange={handleChange} value={formData.course} />
        <input type="text" name="branch" placeholder="Branch" required onChange={handleChange} value={formData.branch} />
        <input type="text" name="collegeName" placeholder="College Name" required onChange={handleChange} value={formData.collegeName} />
        <input type="text" name="enrollmentNo" placeholder="Enrollment No." required onChange={handleChange} value={formData.enrollmentNo} />
        <input type="text" name="contactNo" placeholder="Contact No." required onChange={handleChange} value={formData.contactNo} />
        <input type="email" name="email" placeholder="Mail ID" required onChange={handleChange} value={formData.email} />
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;