import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VolunteerOrders() {
  const navigate = useNavigate();
  const volunteer = JSON.parse(localStorage.getItem("currentVolunteer"));

  const [view, setView] = useState("accepted");
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otpError, setOtpError] = useState("");

  /* ===== OTP VERIFY ===== */
  const verifyOtp = () => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    let success = false;

    const updatedOrders = allOrders.map(order => {
      if (
        order.id === selectedOrder.id &&
        order.otp === enteredOtp
      ) {
        success = true;
        return { ...order, status: "completed" };
      }
      return order;
    });

    if (!success) {
      setOtpError("Wrong OTP");
      return;
    }

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setShowOtpBox(false);
    setEnteredOtp("");
    setOtpError("");
    window.location.reload();
  };

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    if (!volunteer) navigate("/volunteer/login");
  }, [volunteer, navigate]);

  /* ===== LOAD ORDERS ===== */
  useEffect(() => {
  const loadOrders = () => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  };

  loadOrders();
  window.addEventListener("storage", loadOrders);

  return () => window.removeEventListener("storage", loadOrders);
}, []);



  if (!volunteer) return null;

  /* ===== FILTERS ===== */
  const availableOrders = orders.filter(o => o.status === "pending");
  const myAcceptedOrders = orders.filter(
    o => o.status === "accepted" && o.volunteerId === volunteer.id
  );
  const myCompletedOrders = orders.filter(
    o => o.status === "completed" && o.volunteerId === volunteer.id
  );

  /* ===== ACCEPT ORDER ===== */
  const acceptOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            status: "accepted",
            acceptedBy: volunteer.name,
            volunteerId: volunteer.id,
            acceptedAt: new Date().toLocaleString()
          }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  /* ===== FOOD TYPE BADGE ===== */
  const FoodTypeBadge = ({ type }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        fontWeight: "600",
        color: type === "Veg" ? "#4CAF50" : "#FF5252"
      }}
    >
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: type === "Veg" ? "#4CAF50" : "#FF5252"
        }}
      />
      {type}
    </span>
  );

  return (
    <>
      <div style={page}>
        {/* PROFILE */}
        <div style={headerRight}>
          <img src={volunteer.photo} alt="profile" style={avatar} />
          <span style={nameText}>{volunteer.name}</span>

          <div style={menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          {menuOpen && (
            <div style={dropdown}>
              <div onClick={() => navigate("/volunteer/id-card")}>
                My ID Card
              </div>
              <div
                onClick={() => {
                  localStorage.removeItem("currentVolunteer");
                  navigate("/");
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        <h2>Volunteer Dashboard</h2>

        <div style={grid}>
          {/* ===== MY ORDERS ===== */}
          <div style={card}>
            <h3>My Orders</h3>

            <div style={toggle}>
              <button
                style={view === "accepted" ? activeBtn : btn}
                onClick={() => setView("accepted")}
              >
                Accepted
              </button>
              <button
                style={view === "completed" ? activeBtn : btn}
                onClick={() => setView("completed")}
              >
                Completed
              </button>
            </div>

            {view === "accepted" &&
              (myAcceptedOrders.length === 0 ? (
                <p>No accepted orders yet</p>
              ) : (
                myAcceptedOrders.map(order => (
                  <div key={order.id} style={orderItem}>
                    <p>📦 {order.donorName}</p>
                    <p style={smallText}>📍 {order.location}</p>
                    <FoodTypeBadge type={order.foodType} />

                    <button
                      style={acceptBtn}
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOtpBox(true);
                      }}
                    >
                      Enter OTP
                    </button>
                  </div>
                ))
              ))}

            {view === "completed" &&
              (myCompletedOrders.length === 0 ? (
                <p style={{ opacity: 0.6 }}>No completed orders yet</p>
              ) : (
                myCompletedOrders.map(order => (
                  <div key={order.id} style={orderItem}>
                    <p>📦 {order.donorName}</p>
                    <p style={smallText}>📍 {order.location}</p>
                    <FoodTypeBadge type={order.foodType} />
                    {order.rating && (
                      <p>⭐ Rating: {order.rating}/5</p>
                    )}
                  </div>
                ))
              ))}
          </div>

          {/* ===== AVAILABLE ORDERS ===== */}
          <div style={card}>
            <h3>Available Orders</h3>

            {availableOrders.length === 0 ? (
              <p style={{ opacity: 0.7 }}>No new orders</p>
            ) : (
              availableOrders.map(order => (
                <div key={order.id} style={orderCard}>
                  <div>
                    <p><strong>{order.donorName}</strong></p>
                    <p style={smallText}>⏱ {order.pickupTime}</p>

                    {/* 👇 VOLUNTEER SEES FOOD TYPE BEFORE ACCEPT */}
                    <FoodTypeBadge type={order.foodType} />
                  </div>

                  <button
                    style={acceptBtn}
                    onClick={() => acceptOrder(order.id)}
                  >
                    Accept
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ===== OTP MODAL ===== */}
      {showOtpBox && (
        <div style={overlay}>
          <div style={otpBox}>
            <h3>Please enter the OTP</h3>

            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              maxLength={4}
              style={otpInput}
            />

            {otpError && (
              <p style={{ color: "red", fontSize: "13px" }}>
                {otpError}
              </p>
            )}

            <button style={acceptBtn} onClick={verifyOtp}>
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ===== STYLES ===== */
const page = { minHeight: "100vh", padding: "30px", color: "#fff" };
const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" };
const card = { background: "rgba(255,255,255,0.08)", padding: "20px", borderRadius: "16px" };
const toggle = { display: "flex", gap: "10px", marginBottom: "15px" };
const btn = { flex: 1, padding: "8px", borderRadius: "20px", border: "1px solid #fff", background: "transparent", color: "#fff" };
const activeBtn = { ...btn, background: "#4CAF50", border: "none" };
const orderCard = { background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "12px", display: "flex", justifyContent: "space-between" };
const orderItem = { marginBottom: "14px" };
const smallText = { fontSize: "12px", opacity: 0.8 };
const acceptBtn = { background: "#4CAF50", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "16px", marginTop: "8px" };
const headerRight = { position: "absolute", top: 20, right: 120, display: "flex", gap: "10px" };
const avatar = { width: 42, height: 42, borderRadius: "50%", border: "2px solid #4CAF50" };
const nameText = { fontSize: "14px", fontWeight: "500" };
const menuIcon = { fontSize: "22px", cursor: "pointer" };
const dropdown = { position: "absolute", top: "55px", background: "#1e1e3f", padding: "10px", borderRadius: "10px" };
const overlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center" };
const otpBox = { background: "#fff", padding: "20px", borderRadius: "12px", width: "300px", textAlign: "center" };
const otpInput = { padding: "10px", width: "100%", textAlign: "center", fontSize: "18px", letterSpacing: "4px", marginBottom: "10px" };

export default VolunteerOrders;
