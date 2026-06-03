import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function TripForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [trip, setTrip] = useState({
    from: "",
    destination: "",
    days: "",
    budget: "",
    people: "",
  });

  const destRef = useRef();
  const daysRef = useRef();
  const budgetRef = useRef();
  const peopleRef = useRef();

  const handleEnter = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const generateTrip = async () => {
    if (!trip.from || !trip.destination || !trip.days || !trip.budget) {
      alert("Please fill From, Destination, Days and Budget");
      return;
    }

    try {
      setLoading(true);

      const mapEmbed = `https://www.google.com/maps?q=${trip.destination}&output=embed`;
      const routeMap = `https://www.google.com/maps/dir/${trip.from}/${trip.destination}`;

      const res = await fetch(`${API_URL}/generate-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: trip.destination,
          days: trip.days,
          budget: trip.budget,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Trip generate failed");
        return;
      }

      localStorage.setItem(
        "latestTrip",
        JSON.stringify({
          ...trip,
          mapEmbed,
          routeMap,
          aiTrip: data.trip,
        })
      );

      navigate("/result");
    } catch (error) {
      console.log(error);
      alert("Server connect nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-form-page">
      <div className="trip-form-overlay">
        <div className="trip-form-card">
          <div className="trip-topbar">
            <div>
              <h1 className="trip-form-title">🌍 AI Trip Planner</h1>
              <p className="trip-welcome">Welcome, {user?.name}</p>
              <p className="trip-subtitle">
                Plan your next journey with AI in just a few seconds.
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>

          <div className="trip-form-grid">
            <input
              name="from"
              placeholder="From City"
              className="trip-input"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, destRef)}
            />

            <input
              ref={destRef}
              name="destination"
              placeholder="Destination City"
              className="trip-input"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, daysRef)}
            />

            <input
              ref={daysRef}
              name="days"
              placeholder="Number of Days"
              className="trip-input"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, budgetRef)}
            />

            <input
              ref={budgetRef}
              name="budget"
              placeholder="Total Budget in ₹"
              className="trip-input"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, peopleRef)}
            />

            <input
              ref={peopleRef}
              name="people"
              placeholder="Number of People"
              className="trip-input full-width"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  generateTrip();
                }
              }}
            />

            <button
              onClick={generateTrip}
              className="trip-btn full-width"
              disabled={loading}
            >
              {loading ? "Generating Trip..." : "Generate Trip 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}