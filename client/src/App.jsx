import { useState, useRef } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

export default function App() {
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [trip, setTrip] = useState({
    from: "",
    destination: "",
    days: "",
    budget: "",
    people: "",
  });

  const [result, setResult] = useState(null);

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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful. Please login.");
      setPage("login");
    } catch (error) {
      alert("Server connect nahi ho raha");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      setUser(data.user);
      setPage("trip");
    } catch (error) {
      alert("Server connect nahi ho raha");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTripChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const generateTrip = async () => {
    if (!trip.from || !trip.destination || !trip.days || !trip.budget) {
      alert("Please fill From, Destination, Days and Budget");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

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

      setResult({
        mapEmbed,
        routeMap,
        aiTrip: data.trip,
      });
    } catch (error) {
      alert("Server connect nahi ho raha");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (page === "signup") {
    return (
      <div className="login-page">
        <div className="glass-container">
          <div className="login-card">
            <form onSubmit={handleSignup}>
              <h2 className="login-title">Create Account</h2>

              <input
                className="glass-input"
                placeholder="Name"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
              />

              <input
                className="glass-input"
                placeholder="Email"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />

              <input
                className="glass-input"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
              />

              <button className="login-btn" disabled={loading}>
                {loading ? "Creating..." : "SIGNUP"}
              </button>

              <p style={{ marginTop: "15px", cursor: "pointer" }}>
                Already have account?{" "}
                <span onClick={() => setPage("login")}>Login</span>
              </p>
            </form>
          </div>

          <div className="hero-section">
            <h1>
              CREATE YOUR
              <br />
              AI TRIP PLANNER
              <br />
              ACCOUNT
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (page === "trip") {
    return (
      <div className="trip-page">
        <div className="trip-container">
          <h1 className="trip-title">🌍 AI Trip Planner</h1>

          <p>Welcome, {user?.name}</p>

          <button
            className="route-btn"
            onClick={() => {
              setUser(null);
              setPage("login");
            }}
          >
            Logout
          </button>

          <div className="trip-form">
            <input
              name="from"
              placeholder="From City"
              className="trip-input"
              onChange={handleTripChange}
              onKeyDown={(e) => handleEnter(e, destRef)}
            />

            <input
              ref={destRef}
              name="destination"
              placeholder="Destination City"
              className="trip-input"
              onChange={handleTripChange}
              onKeyDown={(e) => handleEnter(e, daysRef)}
            />

            <input
              ref={daysRef}
              name="days"
              placeholder="Days"
              className="trip-input"
              onChange={handleTripChange}
              onKeyDown={(e) => handleEnter(e, budgetRef)}
            />

            <input
              ref={budgetRef}
              name="budget"
              placeholder="Budget"
              className="trip-input"
              onChange={handleTripChange}
              onKeyDown={(e) => handleEnter(e, peopleRef)}
            />

            <input
              ref={peopleRef}
              name="people"
              placeholder="People"
              className="trip-input"
              onChange={handleTripChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  generateTrip();
                }
              }}
            />

            <button onClick={generateTrip} className="trip-btn" disabled={loading}>
              {loading ? "Generating..." : "Generate Trip 🚀"}
            </button>
          </div>

          {result && (
            <div className="result-section">
              <iframe src={result.mapEmbed} className="map-frame" />

              <a href={result.routeMap} target="_blank" className="route-btn">
                Open Google Route
              </a>

              <h2>🤖 AI Generated Trip Plan</h2>

              <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}>
                {result.aiTrip}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="glass-container">
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <h2 className="login-title">Login to Your Account</h2>

            <input
              className="glass-input"
              placeholder="Email"
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />

            <input
              className="glass-input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button className="login-btn" disabled={loading}>
              {loading ? "Checking..." : "LOGIN"}
            </button>

            <p style={{ marginTop: "15px", cursor: "pointer" }}>
              New user?{" "}
              <span onClick={() => setPage("signup")}>Create Account</span>
            </p>
          </form>
        </div>

        <div className="hero-section">
          <h1>
            THE GOAL OF LIFE IS
            <br />
            LIVING IN AGREEMENT
            <br />
            WITH NATURE
          </h1>
        </div>
      </div>
    </div>
  );
}