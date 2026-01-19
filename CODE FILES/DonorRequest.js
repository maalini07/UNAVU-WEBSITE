import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DonorRequest() {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([{ name: "", qty: "" }]);
  const [form, setForm] = useState({
    organization: "",
    phone: "",
    address: "",
    pickupTime: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoodChange = (index, field, value) => {
    const updated = [...foods];
    updated[index][field] = value;
    setFoods(updated);
  };

  const addFoodItem = () => {
    setFoods([...foods, { name: "", qty: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      donorName: form.organization,
      phone: form.phone,
      address: form.address,
      foodItems: foods,
      pickupTime: form.pickupTime,
      foodType: "Veg",
      status: "pending",
      otp: Math.floor(1000 + Math.random() * 9000)
    };

    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    existing.push(order);
    localStorage.setItem("orders", JSON.stringify(existing));

    navigate("/donor/status");
  };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleSubmit}>
        <p style={infoText}>
          Your food will be picked up only by verified UNAVU volunteers
          and delivered safely to people in need.
        </p>

        <p style={subText}>
          Help us reduce food waste by sharing excess food with those in need.
        </p>

        <input
          style={input}
          placeholder="Hotel / Organization Name"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          required
        />

        <input
          style={input}
          placeholder="Contact Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          style={input}
          placeholder="Pickup Location (Search address)"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        {foods.map((food, index) => (
          <div key={index} style={row}>
            <input
              style={smallInput}
              placeholder="Food name (eg: Idly)"
              value={food.name}
              onChange={(e) =>
                handleFoodChange(index, "name", e.target.value)
              }
              required
            />
            <input
              style={smallInput}
              placeholder="Qty (eg: 50 / 5L)"
              value={food.qty}
              onChange={(e) =>
                handleFoodChange(index, "qty", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="button" style={addBtn} onClick={addFoodItem}>
          + Add another food item
        </button>

        <select
          style={input}
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          required
        >
          <option value="">Expected Pickup Time</option>
          <option>Within 30 minutes</option>
          <option>Within 1 hour</option>
          <option>Within 2 hours</option>
        </select>

        <button style={submitBtn}>Request Food Pickup</button>
      </form>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1B1F3B, #2E2A68)"
};

const card = {
  width: "420px",
  background: "#fff",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
};

const infoText = {
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "10px"
};

const subText = {
  textAlign: "center",
  fontSize: "13px",
  color: "#555",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  marginBottom: "14px"
};

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px"
};

const smallInput = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const addBtn = {
  background: "none",
  border: "none",
  color: "#4CAF50",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "15px"
};

const submitBtn = {
  width: "100%",
  padding: "14px",
  background: "#4CAF50",
  border: "none",
  borderRadius: "30px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer"
};

export default DonorRequest;
