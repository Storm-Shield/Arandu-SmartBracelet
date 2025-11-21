import express from 'express'
import QuizController from '../controller/QuestionsController.js'

const controller = new QuizController()
const router = express()

router.get("/", controller.listAll)

export default router