import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/trip");
    } catch (error) {
      alert("Server connect nahi ho raha");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bag-page">
      <div className="auth-layout">
        <div className="auth-left">
          <div className="brand-row">
            <div className="brand-logo">A</div>
            <h1>AI Trip Planner</h1>
          </div>

          <h2>
            Plan Your Trip,
            <span> Smartly With AI</span>
          </h2>

          <p>
            Login karke apna smart AI travel plan generate karo with hotels,
            places, budget, maps and full itinerary.
          </p>

          <div className="auth-features">
            <Feature icon="🔒" title="Secure Login" text="Your account safe and protected." />
            <Feature icon="⚡" title="Fast Planning" text="Few seconds me trip plan ready." />
            <Feature icon="🌍" title="Real Destinations" text="Places, hotels and maps support." />
          </div>
        </div>

        <div className="auth-right">
          <div className="floating-icon auth-i1">🔐</div>
          <div className="floating-icon auth-i2">👤</div>
          <div className="floating-icon auth-i3">📊</div>

          <div className="auth-card-pop">
            <form onSubmit={handleLogin} className="auth-card">
              <div className="auth-card-head">
                <div className="auth-card-logo">A</div>
                <h3>Welcome Back!</h3>
                <p>Login to your AI Trip Planner account</p>
              </div>

              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />

              <input
                className="auth-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />

              <div className="auth-row">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />{" "}
                  Show Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot?
                </button>
              </div>

              <button className="auth-main-btn" disabled={loading}>
                {loading ? "Checking..." : "LOGIN"}
              </button>

              <p className="auth-switch">
                New user?{" "}
                <span onClick={() => navigate("/signup")}>Create Account</span>
              </p>
            </form>
          </div>

          <div className="bag-glow"></div>

          <div className="cartoon-human">
            <div className="human">
              <div className="human-head">
                <div className="hair"></div>
                <div className="eye left-eye"></div>
                <div className="eye right-eye"></div>
                <div className="smile"></div>
              </div>

              <div className="human-body"></div>
              <div className="human-shirt"></div>
              <div className="human-arm"></div>
              <div className="human-hand">👉</div>
              <div className="leg leg-left"></div>
              <div className="leg leg-right"></div>
              <div className="shoe shoe-left"></div>
              <div className="shoe shoe-right"></div>
            </div>
          </div>

          <div className="office-bag">
            <div className="bag-lid"></div>
            <div className="bag-pocket"></div>
            <div className="bag-lock"></div>
            <div className="bag-side bag-side-left"></div>
            <div className="bag-side bag-side-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="auth-feature">
      <div>{icon}</div>
      <section>
        <h4>{title}</h4>
        <p>{text}</p>
      </section>
    </div>
  );
}