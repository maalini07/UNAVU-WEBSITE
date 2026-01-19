import React from "react";
import { Link } from "react-router-dom";

function RegisterSuccess() {
  return (
    <div style={{ textAlign: "center", marginTop: "120px", color: "#fff" }}>
      <h2>✅ Registration Completed</h2>
      <p>Your volunteer account has been created successfully.</p>

      <Link to="/volunteer/id-card">
        <button style={{
          marginTop: "20px",
          padding: "12px 25px",
          borderRadius: "25px",
          border: "none",
          background: "#4CAF50",
          color: "#fff",
          cursor: "pointer"
        }}>
          View My ID Card
        </button>
      </Link>
    </div>
  );
}

export default RegisterSuccess;
