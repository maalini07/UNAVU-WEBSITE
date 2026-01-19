import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VolunteerChoice() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Volunteer Portal</h2>
        <p style={subtitle}>Please choose how you want to continue</p>

        {/* New Volunteer */}
        <button
          style={hover === "new" ? btnPrimaryHover : btnPrimary}
          onMouseEnter={() => setHover("new")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate("/volunteer/register")}
        >
          🆕 New Volunteer
        </button>

        {/* Existing Volunteer */}
        <button
          style={hover === "existing" ? btnOutlineHover : btnOutline}
          onMouseEnter={() => setHover("existing")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate("/volunteer/login")}
        >
          🔐 Existing Volunteer
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const wrapper = {
  minHeight: "calc(100vh - 80px)", // prevents extra white space
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
};

const card = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  width: "360px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
};

const title = {
  marginBottom: "8px",
  color: "#1f2937"
};

const subtitle = {
  marginBottom: "22px",
  color: "#6b7280",
  fontSize: "14px"
};

const btnPrimary = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  marginBottom: "14px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "all 0.25s ease"
};

const btnPrimaryHover = {
  ...btnPrimary,
  backgroundColor: "#43a047",
  transform: "translateY(-2px)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
};

const btnOutline = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#ffffff",
  color: "#4CAF50",
  border: "2px solid #4CAF50",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "all 0.25s ease"
};

const btnOutlineHover = {
  ...btnOutline,
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  transform: "translateY(-2px)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
};

export default VolunteerChoice;
