import React from "react";
import { useNavigate } from "react-router-dom";

function VolunteerIDCard() {
  const navigate = useNavigate(); // ✅ FIX 1

  const volunteer = JSON.parse(
    localStorage.getItem("currentVolunteer")
  );

  if (!volunteer) {
    return <p style={{ color: "#fff" }}>No volunteer data found</p>;
  }

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    return new Date().getFullYear() - birth.getFullYear();
  };

  return (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <h2>Volunteer ID Card</h2>

      <div style={card}>
        <img src={volunteer.photo} alt="profile" style={photo} />

        <div>
          <p><b>Name:</b> {volunteer.name}</p>
          <p><b>Age:</b> {calculateAge(volunteer.dob)}</p>
          <p><b>ID:</b> {volunteer.id}</p>
        </div>
      </div>

      {/* ✅ FIX 2: Button moved INSIDE component */}
      <button
        onClick={() => navigate("/volunteer/login")}
        style={{
          marginTop: "20px",
          padding: "10px 26px",
          borderRadius: "22px",
          border: "1px solid #4CAF50",
          background: "transparent",
          color: "#4CAF50",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Return to Login
      </button>
    </div>
  );
}

const card = {
  background: "#fff",
  color: "#000",
  width: "360px",
  margin: "20px auto",
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const photo = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #4CAF50"
};

export default VolunteerIDCard;
