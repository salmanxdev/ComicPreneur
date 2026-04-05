// src/components/layout4/AdminLogin.jsx

import React, { useState } from "react";
import "./Admin.css";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "Kavyansh" && password === "JNCT@Comic") {
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin} className="admin-form">
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;