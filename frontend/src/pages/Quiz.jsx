import Welcome from "../components/quiz/Welcome"
import QuizQuestions from "../components/quiz/QuizQuestions"
import Result from "../components/quiz/Result"
import Header from "../components/Header"
import {QuestionsService} from "../service/QuestionsService"
import { useEffect, useState } from "react"

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [showWelcome, setShowWelcome] = useState(true)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchQuestions = async () =>{
            const data = await QuestionsService.getAll()
            setQuestions(data)
        }
        fetchQuestions()
    }, [])

    const handleAnswer = (isCorrect) => {
        const newAnswer = [...answers, isCorrect ? 1 : 0]
        
        setAnswers(newAnswer)

        if(currentQuestion >= questions.length - 1){
            setShowResult(true)
        }else{
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const startTest = () => {
        setShowWelcome(false)
    }

    const restartTest = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setShowResult(false)
        setShowWelcome(true)
    }

    return(
        <>
        <Header/>
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#F0FDF9] to-[#0D9488] dark:bg-gradient-to-bl dark:from-[#0D9488] dark:to-[#061413] z-0"></div>
            <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-light-bg2/90 dark:bg-dark-bg2/90 backdrop-blur-sm border border-light-border/30 dark:border-dark-border/30 shadow-2xl p-6 md:p-10">
                {showWelcome && (<Welcome onStart={startTest}/>)}
                {!showWelcome && !showResult && (
                    <QuizQuestions
                        question={questions[currentQuestion]}
                        questionNumber={currentQuestion+1}
                        onAnswer={handleAnswer}
                    />
                )}
                {showResult && <Result questions={questions} answers={answers} restartTest={restartTest}/>}
            </div>
        </div>
        </>
    )
}

export default Quiz