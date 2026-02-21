import { useState } from "react";
import api from "../api";

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get(`/bookings?email=${email}`);
    setBookings(res.data);
  };

  return (
    <div style={pageBackground}>
      <div style={container}>
        <h2>My Bookings</h2>

        <input
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={input}
        />

        <button onClick={fetchBookings} style={button}>
          Search
        </button>

        {bookings.map(b => (
          <div key={b._id} style={card}>
            <p><strong>Expert:</strong> {b.expert.name}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.timeSlot}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔵 Full Page Background */
const pageBackground = {
  backgroundColor: "#008080",
  minHeight: "100vh",
  paddingTop: "40px"
};

/* ⚪ White Main Container */
const container = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  fontFamily: "Arial",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  color: "black"
};

const input = {
  padding: "10px",
  marginBottom: "15px",
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const button = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "#006666",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px"
};

const card = {
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  background: "#f9f9f9",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
};