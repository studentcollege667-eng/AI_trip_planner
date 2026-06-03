import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    <div className="login-page">
      <div className="glass-container">
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <h2 className="login-title">Login to Your Account</h2>

            <input
              className="glass-input"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                })
              }
            />

            <input
              className="glass-input"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  password: e.target.value,
                })
              }
            />

            <p
              style={{
                marginBottom: "15px",
                cursor: "pointer",
                textAlign: "right",
                color: "white",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button className="login-btn" disabled={loading}>
              {loading ? "Checking..." : "LOGIN"}
            </button>

            <p style={{ marginTop: "15px", cursor: "pointer" }}>
              New user?{" "}
              <span onClick={() => navigate("/signup")}>Create Account</span>
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