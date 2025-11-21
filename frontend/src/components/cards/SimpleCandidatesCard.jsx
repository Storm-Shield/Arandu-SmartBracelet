import { useState } from "react"
import ExtendCandidatesCard from "./ExtendCandidatesCard"

const SimpleCandidatesCard = ({id, name, photo, position, summary, localization, interestsArea}) => {
    const [showExtended, setShowExtended] = useState(false)

    return(
        <>
           <article className="flex flex-col sm:flex-row bg-light-bg2 dark:bg-dark-bg p-4 sm:p-7 border-b-1 rounded-2xl shadow-b-sm dark:shadow-lg dark:shadow-dark-text2/10">
                <header className="flex justify-center sm:justify-start sm:mr-4 mb-3 sm:mb-0">
                    <img src={photo} alt="profile photo" className="rounded-full h-16 w-16 sm:h-20 sm:w-20 object-cover border-2 border-light-border dark:border-dark-border" />
                </header>
                <div className="flex-1">
                    <section className="flex flex-col text-light-text dark:text-dark-text1">
                        <h3 className="text-light-accent dark:text-dark-text2 font-medium text-lg mb-1">
                            {name}
                        </h3>
                        <div className="text-light-text/80 dark:text-dark-text1/70 text-sm mb-2">
                            {position} • {localization}
                        </div>
                        <div className="text-justify py-2 text-sm line-clamp-3">
                            {summary}
                        </div>
                        <div className="text-sm opacity-70 mt-2">
                            <span className="font-medium text-light-text dark:text-dark-text1">Áreas de interesse:</span> 
                            <span className="text-light-accent dark:text-dark-text2 ml-1">
                                {interestsArea.join(" | ")}
                            </span>
                        </div>
                    </section>
                    <footer className="mt-3">
                        <button className="text-light-accent dark:text-dark-text2 hover:text-light-bg3 dark:hover:text-white hover:underline text-sm font-medium transition-colors duration-300" onClick={() => setShowExtended(true)}>
                            ver perfil completo
                        </button>
                    </footer>
                </div>
            </article>

            {showExtended && <ExtendCandidatesCard id={id} onClose ={() => setShowExtended(false)}/>}
           
           
        </>
    )
}

export default SimpleCandidatesCard