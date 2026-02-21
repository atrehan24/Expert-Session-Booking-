import { Link } from "react-router-dom";

export default function ExpertCard({ expert }) {
  return (
    <Link to={`/experts/${expert._id}`} style={{ textDecoration: "none" }}>
      <div style={cardStyle}>
        <h3>{expert.name}</h3>
        <p>Category: {expert.category}</p>
        <p>Experience: {expert.experience} years</p>
        <p>⭐ {expert.rating}</p>
      </div>
    </Link>
  );
}

const cardStyle = {
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "12px",
  background: "#F5F5DC",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  color: "#333"
};