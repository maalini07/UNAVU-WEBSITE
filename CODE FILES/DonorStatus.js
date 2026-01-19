import React, { useEffect, useState } from "react";

function DonorStatus() {
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length === 0) return;

    // Always fetch latest order
    const latestOrder = orders[orders.length - 1];
    setOrder(latestOrder);
  }, []);

  if (!order) return null;

  return (
    <div style={container}>
      <h2>Food Pickup Status</h2>

      {/* ===== COMPLETED ===== */}
      {order.status === "completed" ? (
        <>
          <h3 style={{ marginTop: "20px" }}>
            Rate the Volunteer ({order.acceptedBy})
          </h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={select}
          >
            <option value="">Select rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐ 2</option>
            <option value="3">⭐ 3</option>
            <option value="4">⭐ 4</option>
            <option value="5">⭐ 5</option>
          </select>

          <br />

          <textarea
            placeholder="Comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={textarea}
          />

          <br />

          <button
            style={button}
            onClick={() => {
              const orders =
                JSON.parse(localStorage.getItem("orders")) || [];

              const updatedOrders = orders.map((o) =>
                o.id === order.id
                  ? { ...o, rating, comment }
                  : o
              );

              localStorage.setItem(
                "orders",
                JSON.stringify(updatedOrders)
              );

              alert("Thank you for your feedback!");
            }}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          {/* ===== OTP ALWAYS VISIBLE ===== */}
          <p style={{ marginTop: "20px" }}>
            🔐 <b>Pickup OTP:</b>{" "}
            <span style={otpStyle}>{order.otp}</span>
          </p>

          {/* ===== PENDING ===== */}
          {order.status === "pending" && (
            <p>⏳ Waiting for a volunteer to accept your request...</p>
          )}

          {/* ===== ACCEPTED ===== */}
          {order.status === "accepted" && (
            <>
              <p style={{ fontSize: "18px", color: "#4CAF50" }}>
                ✅ Accepted by <b>{order.acceptedBy}</b>
              </p>
              <p>🚗 Volunteer is on the way</p>

              <p style={{ marginTop: "20px" }}>
                🤝 Share the OTP with <b>{order.acceptedBy}</b> at pickup
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  textAlign: "center",
  padding: "60px",
  color: "#fff"
};

const otpStyle = {
  letterSpacing: "4px",
  fontWeight: "bold",
  fontSize: "20px"
};

const select = {
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "8px"
};

const textarea = {
  width: "300px",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "8px"
};

const button = {
  marginTop: "12px",
  padding: "8px 18px",
  borderRadius: "18px",
  border: "none",
  background: "#4CAF50",
  color: "#fff",
  cursor: "pointer"
};

export default DonorStatus;
