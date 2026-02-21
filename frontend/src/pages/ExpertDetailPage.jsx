import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ExpertDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    api.get(`/experts/${id}`).then(res => setExpert(res.data));
  }, [id]);

  useEffect(() => {
    socket.on("slotBooked", data => {
      if (data.expert === id) {
        setBookedSlots(prev => [...prev, data.timeSlot]);
      }
    });
  }, [id]);

  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  if (!expert) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={pageBackground}>
      <div style={container}>
        <h2>{expert.name}</h2>
        <p>{expert.category}</p>
        <p>{expert.experience} years experience</p>
        <p>⭐ {expert.rating}</p>

        <h3>Available Slots</h3>

        {timeSlots.map(slot => (
          <button
            key={slot}
            disabled={bookedSlots.includes(slot)}
            onClick={() => navigate(`/book/${id}?slot=${slot}`)}
            style={{
              margin: "10px",
              padding: "10px 18px",
              borderRadius: "8px",
              background: bookedSlots.includes(slot) ? "#822659" : "#008080",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

/* 🔵 Teal page background */
const pageBackground = {
  backgroundColor: "#008080",
  minHeight: "100vh",
  paddingTop: "40px"
};

/* ⚪ White card container */
const container = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  fontFamily: "Arial",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  color: "black" 
};