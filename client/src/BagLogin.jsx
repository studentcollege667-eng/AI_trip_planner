import { useState } from "react";
import "./App.css";

export default function BagLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert("Login clicked");
    } else {
      alert("Signup clicked");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#eef4ff] via-white to-[#e8ddff] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE */}
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              A
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              AI Trip Planner
            </h1>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
              Plan Your Trip,
              <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Smartly With AI
              </span>
            </h2>

            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Login karke apna smart AI travel plan generate karo with hotels,
              places, budget and full itinerary.
            </p>
          </div>

          <div className="grid gap-4 max-w-md">
            <Feature icon="🔒" title="Secure Login" text="Your account safe and protected." />
            <Feature icon="⚡" title="Fast Planning" text="Few seconds me trip plan ready." />
            <Feature icon="🌍" title="Real Destinations" text="Places, hotels and maps support." />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative min-h-[620px] flex items-end justify-center">
          
          <div className="absolute top-16 left-12 floating-icon">🔐</div>
          <div className="absolute top-28 right-10 floating-icon delay-1">👤</div>
          <div className="absolute bottom-52 left-8 floating-icon delay-2">📊</div>

          {/* LOGIN CARD */}
          <div className="absolute bottom-40 z-30 w-[340px] md:w-[380px] animate-cardUp">
            <form
              onSubmit={handleSubmit}
              className="rounded-[32px] border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_25px_80px_rgba(99,102,241,0.35)] p-7"
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  A
                </div>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h3>

                <p className="text-sm text-slate-500">
                  {isLogin
                    ? "Login to your AI Trip Planner"
                    : "Signup and start planning trips"}
                </p>
              </div>

              {!isLogin && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div className="mb-5">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>

                  {isLogin && (
                    <button
                      type="button"
                      className="text-sm text-purple-600 font-medium"
                    >
                      Forgot?
                    </button>
                  )}
                </div>

                <input
                  type="password"
                  placeholder="Enter password"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-bold text-white shadow-lg shadow-purple-300 hover:scale-[1.02] transition"
              >
                {isLogin ? "Login" : "Signup"}
              </button>

              <p className="mt-5 text-center text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-purple-600"
                >
                  {isLogin ? "Signup" : "Login"}
                </button>
              </p>
            </form>
          </div>

          {/* BAG GLOW */}
          <div className="absolute bottom-28 z-20 w-[420px] h-[280px] bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

          {/* CARTOON CHARACTER */}
          <div className="absolute right-2 bottom-20 z-20 hidden md:block animate-character">
            <div className="relative w-64 h-80">
              
              {/* Head */}
              <div className="absolute top-0 left-20 w-28 h-28 bg-[#f6b58a] rounded-full shadow-xl">
                <div className="absolute -top-4 left-4 w-20 h-12 bg-[#3a1f16] rounded-t-full rotate-[-8deg]"></div>
                <div className="absolute top-10 left-7 w-4 h-4 bg-slate-900 rounded-full"></div>
                <div className="absolute top-10 right-7 w-4 h-4 bg-slate-900 rounded-full"></div>
                <div className="absolute top-16 left-10 w-10 h-5 border-b-4 border-slate-900 rounded-full"></div>
              </div>

              {/* Body */}
              <div className="absolute top-24 left-14 w-40 h-44 bg-blue-600 rounded-[40px] shadow-xl"></div>
              <div className="absolute top-32 left-24 w-20 h-32 bg-white rounded-[30px]"></div>

              {/* Arm */}
              <div className="absolute top-38 left-2 w-28 h-8 bg-[#f6b58a] rounded-full rotate-[-20deg] shadow-lg"></div>
              <div className="absolute top-32 left-4 text-3xl rotate-[-20deg]">👉</div>

              {/* Legs */}
              <div className="absolute bottom-0 left-8 w-20 h-28 bg-slate-800 rounded-3xl rotate-12"></div>
              <div className="absolute bottom-0 right-4 w-20 h-28 bg-slate-700 rounded-3xl -rotate-12"></div>

              {/* Shoes */}
              <div className="absolute bottom-0 left-2 w-24 h-10 bg-white rounded-full shadow"></div>
              <div className="absolute bottom-0 right-0 w-24 h-10 bg-white rounded-full shadow"></div>
            </div>
          </div>

          {/* OFFICE BAG */}
          <div className="absolute bottom-10 z-10 w-[440px] max-w-[90%] h-44 bg-gradient-to-br from-[#3b1f16] to-[#1f0f0b] rounded-[36px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-[#7c4a2c] animate-bagOpen">
            <div className="absolute -top-9 left-8 right-8 h-16 bg-gradient-to-br from-[#5a2c1c] to-[#2a120c] rounded-t-[45px] origin-bottom animate-lidOpen border border-[#8b5a3c]"></div>

            <div className="absolute top-10 left-10 right-10 h-20 rounded-3xl border border-[#8b5a3c] bg-[#2c140e]"></div>

            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-9 rounded-xl bg-[#b77938] shadow-lg"></div>

            <div className="absolute -left-4 top-10 w-8 h-24 bg-[#2a120c] rounded-full border border-[#8b5a3c]"></div>
            <div className="absolute -right-4 top-10 w-8 h-24 bg-[#2a120c] rounded-full border border-[#8b5a3c]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white/70 backdrop-blur-md p-4 shadow-lg border border-white">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}