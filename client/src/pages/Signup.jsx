import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

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
        alert(data.error);
        return;
      }

      alert("Account Created Successfully ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="glass-container">
        <div className="login-card">
          <form onSubmit={handleSignup}>
            <h2 className="login-title">Create Account</h2>

            <input
              className="glass-input"
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="glass-input"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="glass-input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="login-btn">
              {loading ? "Creating..." : "SIGNUP"}
            </button>

            <p
              style={{ marginTop: "15px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Already have account? Login
            </p>
          </form>
        </div>

        <div className="hero-section">
          <h1>
            EXPLORE THE
            <br />
            WORLD WITH
            <br />
            AI ✈️
          </h1>
        </div>
      </div>
    </div>
  );
}