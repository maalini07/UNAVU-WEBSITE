import React from "react";
import { useNavigate } from "react-router-dom";

function Donor() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "60px", color: "#fff" }}>
      <h1>Donor Portal</h1>
      <p>Post surplus food for volunteers to collect.</p>

      <button
        onClick={() => navigate("/donor/request")}
        style={{
          padding: "12px 24px",
          background: "#4CAF50",
          border: "none",
          borderRadius: "20px",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Post Food Donation
      </button>
    </div>
  );
}

export default Donor;
