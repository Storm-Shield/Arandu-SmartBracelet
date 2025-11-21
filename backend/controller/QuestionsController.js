import QuizRepository from "../repository/QuestionsRepository.js";

const repository = new QuizRepository()

class QuizController{
    async listAll(_, res){
        try{
            const questions = await repository.listAll()
            res.status(200).json(questions)
        }catch(error){
            res.status(500).json({message:"error to list all questions:"+error.message})
        }
    }
}

export default QuizController