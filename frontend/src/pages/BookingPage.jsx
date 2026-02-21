import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api";

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const slot = searchParams.get("slot");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date) {
      return alert("Please fill all required fields");
    }

    try {
      await api.post("/bookings", {
        ...form,
        expert: id,
        timeSlot: slot
      });
      alert("Booking successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={pageBackground}>
      <div style={container}>
        <h2 style={{ textAlign: "center" }}>Book Slot: {slot}</h2>

        <form onSubmit={handleSubmit}>
          {["name", "email", "phone", "date"].map(field => (
            <input
              key={field}
              placeholder={field}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              style={input}
            />
          ))}

          <textarea
            placeholder="Notes"
            onChange={e => setForm({ ...form, notes: e.target.value })}
            style={input}
          />

          <button style={btn}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageBackground = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #9ccfcc, #0f766e)", // 🔥 TEAL BACKGROUND
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const container = {
  width: "500px",
  background: "beige",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(158, 167, 168, 0.2)",
  fontFamily: "Arial",
  color: "black"

};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const btn = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "#45899a",
  color: "white",
  border: "none",
  cursor: "pointer"
};