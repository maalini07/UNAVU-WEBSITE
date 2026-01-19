import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import VolunteerChoice from "./VolunteerChoice";
import VolunteerRegister from "./VolunteerRegister";
import RegisterSuccess from "./RegisterSuccess";
import VolunteerIDCard from "./VolunteerIDCard";
import VolunteerLogin from "./VolunteerLogin";
import VolunteerOrders from "./VolunteerOrders";

import Donor from "./Donor";
import DonorRequest from "./DonorRequest";
import DonorStatus from "./DonorStatus";

function App() {
  return (
    <Router>
      <div style={page}>
        {/* HEADER */}
        <header style={header}>
          <h2>UNAVU</h2>
          <div>
            <Link to="/volunteer">
              <button style={btn}>Volunteer</button>
            </Link>
            <Link to="/donor">
              <button style={btnOutline}>Donor</button>
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Volunteer */}
          <Route path="/volunteer" element={<VolunteerChoice />} />
          <Route path="/volunteer/register" element={<VolunteerRegister />} />
          <Route path="/volunteer/success" element={<RegisterSuccess />} />
          <Route path="/volunteer/id-card" element={<VolunteerIDCard />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route path="/volunteer/orders" element={<VolunteerOrders />} />

          {/* Donor */}
          <Route path="/donor" element={<Donor />} />
          <Route path="/donor/request" element={<DonorRequest />} />
          <Route path="/donor/status" element={<DonorStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Rescue surplus food. Feed lives.</h1>
      <p>Connect donors with volunteers instantly.</p>
    </div>
  );
}

const page = { minHeight: "100vh", background: "#1B1F3B", color: "#fff" };
const header = { display: "flex", justifyContent: "space-between", padding: "20px" };
const btn = { marginRight: "10px", padding: "8px 16px", background: "#4CAF50", border: "none", color: "#fff" };
const btnOutline = { padding: "8px 16px", background: "transparent", border: "1px solid #4CAF50", color: "#4CAF50" };

export default App;
