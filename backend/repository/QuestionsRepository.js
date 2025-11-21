import fs from "fs/promises"

const DATA_PATH = "./data/Questions.json"

class QuizRepository{
    async listAll(){
        try{
            const data = await fs.readFile(DATA_PATH, "utf-8")
            const questions = JSON.parse(data)
            return questions
        }catch (error) {
            throw new Error("Error to list questions: "+error)
        }
    }
}

export default QuizRepository