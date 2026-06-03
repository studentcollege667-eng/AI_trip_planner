const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const app = express()

app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

app.post("/generate-trip", async (req, res) => {

    const { destination, days, budget } = req.body

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        })

        const prompt = `
        Create a travel plan.

        Destination: ${destination}
        Days: ${days}
        Budget: ${budget}

        Include:
        - Day wise itinerary
        - Hotel suggestions
        - Food suggestions
        - Budget tips
        `

        const result = await model.generateContent(prompt)

        const response = result.response.text()

        res.json({
            trip: response
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            error: "Something went wrong"
        })

    }

})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})