import { useEffect, useState } from "react";
import api from "../api";
import ExpertCard from "../components/ExpertCard";

export default function ExpertListPage() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/experts?page=${page}&search=${search}&category=${category}`
      );
      setExperts(res.data.experts);
      setTotal(res.data.total);
    } catch {
      alert("Error loading experts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [page, search, category]);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      
      {/* HERO SECTION */}
      <div style={heroSection}>
        <h1 style={heroTitle}>Expert Session Booking</h1>
        <p style={heroSubtitle}>Find the perfect mentor for your growth</p>

        <div style={filterContainer}>
          <input
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            style={input}
          />

          <input
            placeholder="Filter by category"
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            style={input}
          />
        </div>
      </div>

      {/* EXPERT LIST */}
      <div style={cardSection}>
        {loading ? (
          <p>Loading experts...</p>
        ) : experts.length === 0 ? (
          <p>No experts found.</p>
        ) : (
          
          experts.map((e) => (
            <ExpertCard key={e._id} expert={e} />
          ))
        )}

        {/* PAGINATION */}
        <div style={pagination}>
          <button
            style={pageButton}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 15px", fontWeight: "600" }}>
            Page {page}
          </span>

          <button
            style={pageButton}
            disabled={page * 5 >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ STYLES ------------------ */

const heroSection = {
  background: "linear-gradient(to right, #222222, #822659)",
  padding: "70px 20px",
  textAlign: "center",
  color: "white"
};

const heroTitle = {
  fontSize: "42px",
  marginBottom: "10px",
  fontFamily: "Playfair Display, serif"
};

const heroSubtitle = {
  fontSize: "18px",
  marginBottom: "30px",
  opacity: 0.9
};

const filterContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap"
};

const input = {
  padding: "12px",
  width: "250px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px"
};

const cardSection = {
  maxWidth: "900px",
  margin: "40px auto"
};

const pagination = {
  marginTop: "30px",
  textAlign: "center"
};

const pageButton = {
  padding: "8px 18px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#181818",
  color: "white"
};
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px"
};