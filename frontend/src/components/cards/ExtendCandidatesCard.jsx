import { useEffect, useState } from "react"
import { CandidatesService } from "../../service/CandidatesService"
import { useNavigate } from 'react-router-dom';

const ExtendCandidatesCard = ({id, onClose}) => {
    const [candidate, setCandidate] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    
   
    const navigate = useNavigate();
    const handleMessage = () => {
        navigate(`/message/${candidate.name}`);
    }

    
    useEffect(() => {
        const fetchCandidatesById = async () => {
            const data = await CandidatesService.getByID(id)
            setCandidate(data)
        }

        fetchCandidatesById()
        
        setTimeout(() => setIsVisible(true), 50)
    }, [id])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 300)
    }

    const handleRecommend = () => {
        console.log("Recomendando perfil:", candidate.name)
        alert(`Perfil de ${candidate.name} recomendado com sucesso!`)
    }

    
    if (!candidate.id) return null

    return(
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
            <div className={`bg-light-bg2 dark:bg-dark-bg2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
                <div className="p-6">
                    <div className="flex items-start gap-6 mb-6">
                        <img 
                            src={candidate.photo} 
                            alt={`Foto de ${candidate.name}`}
                            className="rounded-full w-24 h-24 object-cover border-4 border-light-accent dark:border-dark-text2 transition-transform duration-300 hover:scale-105"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text1 mb-2 transition-colors duration-300">
                                {candidate.name}
                            </h2>
                            <p className="text-light-accent dark:text-dark-text2 font-medium mb-1 transition-colors duration-300">
                                {candidate.position}
                            </p>
                            <p className="text-light-text/70 dark:text-dark-text1/70 text-sm transition-colors duration-300">
                                {candidate.localization}
                            </p>
                        </div>
                        <button 
                            onClick={handleClose}
                            className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 text-2xl transition-colors duration-300 hover:scale-110 transform"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button 
                            onClick={handleRecommend}
                            className="flex-1 bg-light-accent hover:bg-light-bg3 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-light-accent/25 flex items-center justify-center gap-2"
                        >
                            <span>⭐</span>
                            Recomendar Perfil
                        </button>
                        <button 
                            onClick={handleMessage}
                            className="flex-1 bg-light-border dark:bg-dark-border hover:bg-light-text hover:text-white dark:hover:bg-dark-text2 dark:hover:text-dark-bg2 text-light-text dark:text-dark-text1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform shadow-lg border border-light-border dark:border-dark-border flex items-center justify-center gap-2"
                        >
                            <span>✉️</span>
                            Enviar Mensagem
                        </button>
                    </div>

                    <section className="mb-6 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Resumo</h3>
                        <p className="text-light-text dark:text-dark-text1 leading-relaxed transition-colors duration-300">
                            {candidate.summary}
                        </p>
                    </section>

                    {candidate.hard_skills && (
                        <section className="mb-6 transition-all duration-300 delay-75">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Hard Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.hard_skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-light-accent/10 dark:bg-dark-text2/10 text-light-accent dark:text-dark-text2 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-light-accent/20 dark:hover:bg-dark-text2/20 hover:scale-105 transform"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {candidate.soft_skills && (
                        <section className="mb-6 transition-all duration-300 delay-100">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.soft_skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text1 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-light-accent/10 dark:hover:bg-dark-text2/10 hover:scale-105 transform"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {candidate.experiences && (
                        <section className="mb-6 transition-all duration-300 delay-150">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Experiência</h3>
                            <div className="space-y-4">
                                {candidate.experiences.map((exp, index) => (
                                    <div 
                                        key={index} 
                                        className="border-l-4 border-light-accent dark:border-dark-text2 pl-4 transition-all duration-300 hover:border-l-6 hover:pl-5"
                                    >
                                        <h4 className="font-medium text-light-text dark:text-dark-text1 transition-colors duration-300">{exp.position}</h4>
                                        <p className="text-light-accent dark:text-dark-text2 text-sm transition-colors duration-300">{exp.enterprise}</p>
                                        <p className="text-light-text/70 dark:text-dark-text1/70 text-xs transition-colors duration-300">
                                            {exp.initial} - {exp.finish}
                                        </p>
                                        <p className="text-light-text dark:text-dark-text1 text-sm mt-1 transition-colors duration-300">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {candidate.formation && (
                        <section className="mb-6 transition-all duration-300 delay-200">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Formação</h3>
                            <div className="space-y-3">
                                {candidate.formation.map((edu, index) => (
                                    <div key={index} className="transition-all duration-300 hover:translate-x-2">
                                        <h4 className="font-medium text-light-text dark:text-dark-text1 transition-colors duration-300">{edu.course}</h4>
                                        <p className="text-light-accent dark:text-dark-text2 text-sm transition-colors duration-300">{edu.institution}</p>
                                        <p className="text-light-text/70 dark:text-dark-text1/70 text-xs transition-colors duration-300">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {candidate.languages && (
                        <section className="mb-6 transition-all duration-300 delay-250">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Idiomas</h3>
                            <div className="flex flex-wrap gap-3">
                                {candidate.languages.map((lang, index) => (
                                    <div 
                                        key={index} 
                                        className="text-center transition-all duration-300 hover:scale-110 transform"
                                    >
                                        <span className="block font-medium text-light-text dark:text-dark-text1 transition-colors duration-300">{lang.language}</span>
                                        <span className="text-xs text-light-text/70 dark:text-dark-text1/70 transition-colors duration-300">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {candidate.certifications && (
                        <section className="transition-all duration-300 delay-300">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text1 mb-3 transition-colors duration-300">Certificações</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.certifications.map((cert, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text1 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-light-accent/10 dark:hover:bg-dark-text2/10 hover:scale-105 transform"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExtendCandidatesCard