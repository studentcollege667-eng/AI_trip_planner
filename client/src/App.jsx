import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import TripForm from "./pages/TripForm";
import TripResult from "./pages/TripResult";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/trip" element={<TripForm />} />
        <Route path="/result" element={<TripResult />} />
      </Routes>
    </BrowserRouter>
  );
}