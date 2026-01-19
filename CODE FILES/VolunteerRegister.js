import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VolunteerRegister() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PHOTO → BASE64 (FIXED)
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ UNIQUE ID
    const volunteerId =
  "UNAVU-VOL-" + Math.floor(1000 + Math.random() * 9000);


    const volunteerData = {
      id: volunteerId,
      name: form.name,
      dob: form.dob,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      password: form.password,
      photo: photo
    };

    // ✅ SAVE MULTIPLE VOLUNTEERS
    const existing =
      JSON.parse(localStorage.getItem("volunteers")) || [];

    existing.push(volunteerData);

    localStorage.setItem(
      "volunteers",
      JSON.stringify(existing)
    );

    // ✅ REDIRECT AFTER REGISTER
    navigate("/volunteer/success");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>Volunteer Registration</h2>

        <p style={subtitle}>
          Please fill in your details to become a verified UNAVU volunteer.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />

          <select
            style={input}
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>

          <input
            style={input}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* PHOTO UPLOAD */}
          <div style={{ marginBottom: "14px", textAlign: "center" }}>
            <strong>Upload your photo</strong>
            <br /><br />

            {photo && (
              <img
                src={photo}
                alt="Preview"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #4CAF50",
                  marginBottom: "10px"
                }}
              />
            )}

            <label
              style={{
                display: "inline-block",
                padding: "8px 16px",
                background: "#4CAF50",
                color: "#fff",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                required
                style={{ display: "none" }}
              />
            </label>
          </div>

          <button style={button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  width: "360px",
  background: "#fff",
  borderRadius: "16px",
  padding: "30px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const title = {
  marginBottom: "8px",
  color: "#222"
};

const subtitle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "22px"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px"
};

export default VolunteerRegister;
