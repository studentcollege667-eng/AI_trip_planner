import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
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
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account Created Successfully ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Server connect nahi ho raha");
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
            Create Account,
            <span> Start Your AI Journey</span>
          </h2>

          <p>
            Signup karke apna smart travel planner use karo aur AI se complete
            trip plan generate karo.
          </p>

          <div className="auth-features">
            <Feature icon="✈️" title="Smart Trips" text="AI generated travel plans." />
            <Feature icon="🏨" title="Hotels & Places" text="Budget ke hisaab se suggestions." />
            <Feature icon="🗺️" title="Maps Support" text="Destination route and map support." />
          </div>
        </div>

        <div className="auth-right">
          <div className="floating-icon auth-i1">✈️</div>
          <div className="floating-icon auth-i2">👤</div>
          <div className="floating-icon auth-i3">🌍</div>

          <div className="auth-card-pop">
            <form onSubmit={handleSignup} className="auth-card">
              <div className="auth-card-head">
                <div className="auth-card-logo">A</div>
                <h3>Create Account</h3>
                <p>Signup to use AI Trip Planner</p>
              </div>

              <input
                className="auth-input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                className="auth-input"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
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
              </div>

              <button className="auth-main-btn" disabled={loading}>
                {loading ? "Creating..." : "SIGNUP"}
              </button>

              <p className="auth-switch">
                Already have account?{" "}
                <span onClick={() => navigate("/")}>Login</span>
              </p>
            </form>
          </div>

          <div className="bag-glow"></div>

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