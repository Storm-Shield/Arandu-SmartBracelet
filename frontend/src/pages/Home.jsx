import Header from "../components/Header"
import { Link } from "react-router-dom"

const Home = () => {
    return(
        <>
            <Header />
           <main className="flex justify-center items-center min-h-screen border-b-2 border-light-border dark:border-dark-border pt-16 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-bl from-[#F0FDF9] to-[#0D9488] dark:bg-gradient-to-bl dark:from-[#0D9488] dark:to-[#061413] z-0"></div>
            <div className="lg:hidden absolute inset-0 z-10 flex justify-center items-center opacity-30">
                    <img 
                        src="/logo/arandu-v.png" 
                        alt="Logo" 
                        className="h-full object-contain block dark:hidden"
                    />
                    <img 
                        src="/logo/arandu-v-dark.png" 
                        alt="Logo" 
                        className="h-full object-contain hidden dark:block"
                    />
                </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 w-full mx-auto relative z-20">
                         <div className="col-span-1 lg:col-span-2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-6 sm:p-8 lg:p-16 lg:pb-20 mt-11">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-text dark:text-dark-text1 mb-6 lg:mb-8 leading-tight">
                            Busque novas áreas e pessoas.<br/>Traduza suas habilidades para o novo mercado.
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 lg:mt-12 mb-8 lg:mb-12">
                            <Link 
                                to="/feed" 
                                className="px-6 py-4 sm:px-8 sm:py-4 lg:p-6 lg:px-12 rounded-xl font-medium text-white bg-light-bg3 hover:bg-light-accent transition-colors duration-300 shadow-md text-sm sm:text-base text-center"
                            >
                                Encontre pessoas
                            </Link>
                            <Link 
                                to="/quiz" 
                                className="px-6 py-4 sm:px-8 sm:py-4 lg:p-6 lg:px-12 rounded-xl font-medium border border-light-bg3 text-light-bg3 dark:text-dark-text2 dark:border-dark-text2 bg-transparent hover:bg-light-bg3 hover:text-white dark:hover:bg-dark-text2 dark:hover:text-dark-bg2 transition-colors duration-300 text-sm sm:text-base text-center"
                            >
                                Quiz
                            </Link>
                        </div>

                        <div className="mt-4 lg:mt-8">
                            <p className="text-xs sm:text-sm text-light-text dark:text-dark-text1 opacity-70">
                                Desenvolvido por [Carlos Sanches - Vitor Ramos]
                            </p>
                        </div>
                    </div>
                    
                    
                    <div className="hidden lg:flex flex-col justify-center items-center p-8">
                        <div className="flex justify-center">
                            <img 
                                src="/logo/arandu-v.png" 
                                alt="Logo" 
                                className="w-auto h-full block dark:hidden"
                            />
                            <img 
                                src="/logo/arandu-v-dark.png" 
                                alt="Logo" 
                                className="w-auto h-full hidden dark:block"
                            />
                        </div>
                    </div>
                        
                    </div>
                
            </main>
        </>
    )
}

export default Home