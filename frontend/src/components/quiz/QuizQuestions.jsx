const QuizQuestions = ({question, questionNumber, onAnswer}) => {
    console.log("Perguntas recebidas:", question)
    
   
    return (
        <div>
            <h2 className="mb-4 text-xl font-bold text-light-text dark:text-dark-text1 sm:text-2xl">
                Question {questionNumber}
            </h2>
            <p className="flex flex-col font-semibold text-light-accent dark:text-dark-text2 sm:text-2xl mb-4">
                {question.text}
            </p>

            <div className="flex flex-col space-y-4">
                {question.options.map((option, index) => (
                    <button 
                        key={index}
                        onClick={() => onAnswer(option.isCorrect)}
                        className="py-2 rounded-full text-white bg-light-bg3 hover:bg-light-accent transition-colors duration-300 shadow-md text-sm sm:text-xl"
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuizQuestions