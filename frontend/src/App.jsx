import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpertListPage from "./pages/ExpertListPage";
import ExpertDetailPage from "./pages/ExpertDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "sans-serif" }}>
        
        {/* NAVBAR */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 50px",
            background: "linear-gradient(to right, #222222, #181818)"
          }}
        >
          <h2 style={{ margin: 0 }}>Expert Session Booking</h2>

          <div>
            <Link to="/" style={{ marginRight: "20px", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/my-bookings" style={{ textDecoration: "none" }}>
              My Bookings
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ExpertListPage />} />
          <Route path="/experts/:id" element={<ExpertDetailPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;