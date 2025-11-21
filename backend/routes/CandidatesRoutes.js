import express from 'express'
import CandidatesController from '../controller/CandidatesController.js'

const controller = new CandidatesController()
const router = express.Router()

router.get("/", controller.listAll)
router.get("/topics", controller.listTopics)
router.get("/candidate/:id", controller.filterCandidatesById)
router.get("/filter", controller.filterCandidatesByTopics)

export default router