const Result = ({questions, answers, restartTest}) => {
    const score = answers.reduce((total, score) => total + score, 0)
    
    const mistakes = questions.filter((_,index) => answers[index] === 0).map((question) => ({
        question: question.text, 
        correctAnswer: question.options.find((opt) => opt.isCorrect).text
    }))
    console.log("Respostas: " + answers)
    console.log("Error: " + mistakes)

    return (
        <>
            <div className="flex flex-col gap-6 text-center w-full max-h-[70vh] overflow-y-auto py-4">
                <h2 className="text-3xl font-bold text-light-accent dark:text-dark-text2">
                    Quiz Finalizado!
                </h2>

                <p className="text-2xl font-semibold text-light-text dark:text-dark-text1">
                    Sua pontuação: {score} de {questions.length} questões
                </p>

                {mistakes.length > 0 && (
                    <div className="text-left">
                        <h3 className="mb-3 text-xl font-semibold text-red-600 dark:text-red-400">
                            Questões que você errou:
                        </h3>
                        <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {mistakes.map((mistake, index) => (
                                <li key={index} className="rounded-lg bg-light-bg/50 dark:bg-dark-bg3/50 p-4 border border-light-border/30 dark:border-dark-border/30">
                                    <p className="font-medium text-light-text dark:text-dark-text1">{mistake.question}</p>
                                    <p className="mt-1 text-light-accent dark:text-dark-text2 text-sm">Resposta correta: {mistake.correctAnswer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={restartTest}
                    className="w-full max-w-xs mx-auto rounded-xl px-6 py-3 font-medium border border-light-bg3 text-light-bg3 dark:text-dark-text2 dark:border-dark-text2 bg-transparent hover:bg-light-bg3 hover:text-white dark:hover:bg-dark-text2 dark:hover:text-dark-bg2 transition-colors duration-300 text-base mt-4"
                >
                    Refazer Quiz
                </button>
            </div>
        </>
    )
}

export default Result