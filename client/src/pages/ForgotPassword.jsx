import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://ai-trip-planner-3aot.onrender.com";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!form.email || !form.newPassword) {
      alert("Please enter email and new password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Password reset failed");
        return;
      }

      alert("Password reset successful ✅ Please login.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Server connect nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="glass-container">
        <div className="login-card">
          <form onSubmit={handleReset}>
            <h2 className="login-title">Reset Password</h2>

            <input
              className="glass-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="glass-input"
              type="password"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />

            <button className="login-btn" disabled={loading}>
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </button>

            <p
              style={{ marginTop: "15px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </p>
          </form>
        </div>

        <div className="hero-section">
          <h1>
            RESET YOUR
            <br />
            PASSWORD
            <br />
            SECURELY 🔐
          </h1>
        </div>
      </div>
    </div>
  );
}