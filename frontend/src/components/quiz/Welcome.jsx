

const Welcome = ({onStart}) => {
    return (
        <>
            <div className="flex flex-col items-center gap-6 text-center sm:gap8 ">
                <img 
                    src="/logo/arandu-h.png" 
                    alt="Logo" 
                    className="w-auto h-full block dark:hidden"
                />
                <img 
                    src="/logo/arandu-h-dark.png" 
                    alt="Logo" 
                    className="w-auto h-full hidden dark:block"
                />

                <h1 className="text-2xl font-bold text-light-bg3 dark:text-dark-text2 sm:text-2xl">
                    O futuro do Trabalho
                </h1>
                <span className="text-lg font-semibold sm:text-3xl text-light-text dark:text-dark-text1">
                    Você sabe sobre o futuro do mercado de trabalho?
                </span>
                <button onClick={onStart} className="w-1/2 rounded-full px-4 py-2 font-medium border border-light-bg3 text-light-bg3 dark:text-dark-text2 dark:border-dark-text2 bg-transparent hover:bg-light-bg3 hover:text-white dark:hover:bg-dark-text2 dark:hover:text-dark-bg2 transition-colors duration-300 text-sm sm:text-base text-center">
                    Inicar Quiz
                </button>
            </div>
        </>
    )
}

export default Welcome