import CandidatesRepository from "../repository/CandidatesRepository.js";
const repository = new CandidatesRepository()

class CandidatesController{
    async listAll(_, res){
        try{
            const candidates = await repository.listAll()
            res.status(200).json(candidates)
        }catch (error){
             res.status(500).json({message: "Error to list all candidates: "+ error.message})
        }
    }

    async listTopics(_, res){
        try{
            const topics = await repository.listTopics()
            res.status(200).json(topics)
        }catch (error){
            res.status(500).json({message: "Error to list topics: "+ error.message})
        }
    }

    async filterCandidatesById(req, res){
        try{
            const {id} = req.params
            const candidates = await repository.filterById(id)
            res.status(200).json(candidates)
        }catch (error){
            res.status(500).json({message: "Error to filter candidates by id: "+error.message})
        }
    }

    async filterCandidatesByTopics(req, res){
        try{
            const { city, area } = req.query
            const candidates = await repository.filterByTopics(city, area)
            res.status(200).json(candidates)
        }catch (error){
            res.status(500).json({message: "Error to filter candidates by area or city: "+ error.message})
        }
    }
}

export default CandidatesController