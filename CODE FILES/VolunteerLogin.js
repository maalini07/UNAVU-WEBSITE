import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VolunteerLogin() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const volunteers =
      JSON.parse(localStorage.getItem("volunteers")) || [];

    const foundVolunteer = volunteers.find(
      (v) =>
        (v.email === loginId || v.id === loginId) &&
        v.password === password
    );

    if (!foundVolunteer) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    // ✅ SET CURRENT LOGGED-IN VOLUNTEER
    localStorage.setItem(
      "currentVolunteer",
      JSON.stringify(foundVolunteer)
    );

    navigate("/volunteer/orders");
  };

  return (
    <div style={page}>
      {/* LEFT CONTENT (THIS WAS MISSING EARLIER) */}
      <div style={leftContent}>
        <h1 style={heroTitle}>
          Welcome Back, Volunteer 👋
        </h1>

        <p style={heroText}>
          Login to view nearby food rescue requests,
          accept orders, and track your impact with UNAVU.
        </p>

        <ul style={heroList}>
          <li>✔ View available food pickups</li>
          <li>✔ Track accepted & completed orders</li>
          <li>✔ Help reduce food waste</li>
        </ul>
      </div>

      {/* LOGIN CARD */}
      <div style={card}>
        <form onSubmit={handleLogin}>
          <input
            style={input}
            type="text"
            placeholder="Email or Volunteer ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button style={button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===== STYLES (UNCHANGED) ===== */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "80px"
};

const leftContent = {
  maxWidth: "420px",
  color: "#ffffff"
};

const heroTitle = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "16px"
};

const heroText = {
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "20px",
  color: "#e0e0e0"
};

const heroList = {
  listStyle: "none",
  padding: 0,
  fontSize: "15px",
  lineHeight: "1.8",
  color: "#d6ffd6"
};

const card = {
  width: "350px",
  background: "#fff",
  borderRadius: "16px",
  padding: "30px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  fontSize: "16px",
  cursor: "pointer"
};

export default VolunteerLogin;
