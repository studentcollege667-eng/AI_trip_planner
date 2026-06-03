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
You are a professional travel planner.

Create a clean, structured and easy-to-read travel plan.

Destination: ${destination}
Days: ${days}
Budget: ${budget}

Use this exact format:

# 🌍 TRIP OVERVIEW
📍 Destination: ${destination}
🗓️ Duration: ${days} Days
💰 Budget: ${budget}

# 🏨 RECOMMENDED HOTELS
Provide 3 budget-friendly hotels.
For each hotel write:
- Hotel Name:
- Location:
- Approx Price:
- Rating:

# 📅 DAY WISE ITINERARY

For each day, use this format:

## DAY 1
🌅 Morning:
🌞 Afternoon:
🌙 Evening:
🍴 Food Suggestions:
💵 Estimated Cost:

Continue same format for all ${days} days.

# 💰 BUDGET BREAKDOWN
Hotel:
Food:
Transport:
Activities:
Miscellaneous:
Total:

# 🎯 TRAVEL TIPS
Give 5 useful budget travel tips.

Rules:
- Keep the output clean.
- Do not write long paragraphs.
- Use short points.
- Make it look professional.
- Do not add unnecessary explanation.
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