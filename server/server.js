const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password required",
      });
    }

    const { data: oldUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (oldUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Signup successful",
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password required",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// RESET PASSWORD
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Email and new password required",
      });
    }

    const { data: user, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (findError || !user) {
      return res.status(404).json({
        success: false,
        error: "User not found with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
      })
      .eq("email", email);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// GENERATE TRIP
app.post("/generate-trip", async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    if (!destination || !days || !budget) {
      return res.status(400).json({
        success: false,
        error: "destination, days, budget required",
      });
    }

    const prompt = `
You are a smart budget travel planner.

Create a realistic trip plan strictly within the user's total budget.

Destination: ${destination}
Days: ${days}
Total Budget: ₹${budget}

Important Rules:
- The complete trip cost must be within ₹${budget}.
- Do not suggest hotels, food, transport, or activities that make the total cost exceed ₹${budget}.
- If the budget is low, suggest budget hotels, hostels, homestays, local transport, street food, and free/low-cost places.
- Do not give luxury hotels unless the budget allows it.
- Calculate the cost carefully.
- Budget breakdown total must be less than or equal to ₹${budget}.
- Mention "Total Estimated Cost" at the end.
- Mention "Remaining Budget" if money is left.
- If budget is not enough for the destination/days, clearly say it is difficult and suggest reducing days or increasing budget.

Use this exact format:

# 🌍 TRIP OVERVIEW
📍 Destination: ${destination}
🗓️ Duration: ${days} Days
💰 User Budget: ₹${budget}

# ✅ BUDGET STATUS
Write whether this trip is possible within ₹${budget}.

# 🏨 BUDGET STAY OPTIONS
Give 3 affordable stay options only.
For each:
- Name:
- Type:
- Approx Price Per Night:
- Why suitable for this budget:

# 📅 DAY WISE ITINERARY

For each day, use this format:

## DAY 1
🌅 Morning:
🌞 Afternoon:
🌙 Evening:
🍴 Food:
🚍 Transport:
💵 Day Estimated Cost:

Continue same format for all ${days} days.

# 💰 BUDGET BREAKDOWN
Stay:
Food:
Transport:
Activities:
Miscellaneous:

# 🧾 TOTAL COST SUMMARY
Total Estimated Cost:
User Budget: ₹${budget}
Remaining Budget:

# 🎯 MONEY SAVING TIPS
Give 5 useful tips to complete the trip within ₹${budget}.

Rules:
- Keep output clean.
- Use short points.
- Do not exceed user's budget.
- Do not create unrealistic expensive plans.
- All costs must be in Indian Rupees using ₹ symbol.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const generatedTrip = completion.choices[0].message.content;

    const { data, error } = await supabase
      .from("trips")
      .insert([{ destination, days, budget, trip: generatedTrip }])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      trip: generatedTrip,
      saved: data,
    });
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});