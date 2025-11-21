import express from "express"
import cors from "cors"
import candidatesRoute from "./routes/CandidatesRoutes.js"
import quizRoute from "./routes/QuestionsRoutes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use('/candidates', candidatesRoute)
app.use('/questions', quizRoute)

const PORT = 5000

app.listen(PORT, () => {
    console.log("Server running on port: "+PORT)
})