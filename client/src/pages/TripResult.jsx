import { useNavigate } from "react-router-dom";
import "../App.css";

export default function TripResult() {
  const navigate = useNavigate();
  const trip = JSON.parse(localStorage.getItem("latestTrip"));

  if (!trip) {
    return (
      <div className="trip-page">
        <div className="trip-container">
          <h1>No Trip Found</h1>
          <button className="trip-btn" onClick={() => navigate("/trip")}>
            Create Trip
          </button>
        </div>
      </div>
    );
  }

  const getBackgroundImage = (destination) => {
    const city = destination.toLowerCase();

    if (city.includes("goa")) {
      return "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("manali") || city.includes("shimla") || city.includes("kashmir")) {
      return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("london")) {
      return "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("delhi")) {
      return "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("mumbai")) {
      return "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("jaipur") || city.includes("rajasthan")) {
      return "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80";
    }

    if (city.includes("karnataka") || city.includes("bangalore") || city.includes("mysore")) {
      return "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80";
    }

    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";
  };

  const destinationImage = getBackgroundImage(trip.destination);

  return (
    <div
      className="trip-result-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${destinationImage})`,
      }}
    >
      <div className="trip-result-container">
        <h1 className="trip-result-title">🌍 {trip.destination} Trip Plan</h1>

        <div className="overview-card">
          <h2>📌 Trip Overview</h2>

          <div className="overview-grid">
            <p>📍 From: {trip.from}</p>
            <p>📍 Destination: {trip.destination}</p>
            <p>🗓️ Days: {trip.days}</p>
            <p>💰 Budget: {trip.budget}</p>
            <p>👥 People: {trip.people}</p>
          </div>
        </div>

        <div className="map-card">
          <iframe src={trip.mapEmbed} className="map-frame" title="Trip Map" />

          <a
            href={trip.routeMap}
            target="_blank"
            rel="noreferrer"
            className="route-btn"
          >
            Open Google Route
          </a>
        </div>

        <div className="ai-plan-card">
          <h2>🤖 AI Generated Trip Plan</h2>

          <pre className="ai-trip-text">{trip.aiTrip}</pre>
        </div>

        <button className="trip-btn" onClick={() => navigate("/trip")}>
          Create Another Trip
        </button>
      </div>
    </div>
  );
}