import { useEffect } from "react"
import { CandidatesService } from "../service/CandidatesService"
import { useState } from "react"
import SimpleCandidatesCard from "../components/cards/SimpleCandidatesCard"
import Header from "../components/Header"
const Feed = () => {
    const [candidates, setCandidates] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [areas, setAreas] = useState([])
    const [cities, setCities] = useState([])
    const [selectedArea, setSelectedArea] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const candidatesPerPage = 3

    useEffect(()=> {
        const fetchCandidates = async () => {
            
            const data = await CandidatesService.getAll()
            setCandidates(data)
        }
        const fetchTopics = async () => {
            const data = await CandidatesService.getTopics()
            setAreas(data.areas)
            setCities(data.cities)
        }

       
        fetchCandidates()
        fetchTopics()
    }, [])

    useEffect(() => {
        const handleFilter = async () => {
            if (selectedCity === "" && selectedArea === ""){
                const data = await CandidatesService.getAll()
                setCandidates(data)
            }else{

            const data = await CandidatesService.getByTopic(selectedCity,selectedArea)
                setCandidates(data)}
            
        }
        setCurrentPage(1)
 handleFilter()
    }, [selectedCity, selectedArea])

    
    const indexOfLastCandidate = currentPage * candidatesPerPage
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate)

    const totalPages = Math.ceil(candidates.length / candidatesPerPage)

    const getVisiblePages = () => {
        if (totalPages <= 3){
            return Array.from({length: totalPages}, (_,i) => i + 1)
        }

        let startPage = Math.max(currentPage - 1, 1)
        let endPage = Math.min(startPage + 2, totalPages)

        if (endPage - startPage < 2){
            startPage = Math.max(endPage - 2, 1)
        }

        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i)
    }

    const visiblePages = getVisiblePages()
    return(
        <>
        <Header/>
            <main className="flex flex-col items-center p-8 justify-center container mx-auto pt-37 min-h-screen">
                    <h2 className="text-3xl font-light text-light-text dark:text-dark-text1 text-center mb-8">
                        Candidatos em Destaque
                    </h2>
                    <div className="w-full max-w-6xl mb-6 sm:mb-8">
                        
                        <div className="grid grid-cols-2 gap-2">
                           <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="bg-light-bg2 dark:bg-dark-bg3 p-2 text-xl border border-light-border text-light-accent dark:border-dark-border dark:text-dark-text2 rounded-lg">
                            <option value="" disabled>Filtre por área</option>
                            <option value="">All</option>
                            {
                                areas.map(a => (
                                    <option key={a} value={a}>{a}</option>
                                ))
                            }
                           </select>
                           <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-light-bg2 dark:bg-dark-bg3 p-2 text-xl border border-light-border text-light-accent dark:border-dark-border dark:text-dark-text2 rounded-lg">
                            <option value="" disabled>Filtre por cidades</option>
                            <option value="">All</option>
                            {
                                cities.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))
                            }
                           </select>
                        </div>

                        <div>
                        
                        {
                        totalPages > 1 && (
                            <div className="flex justify-center items-center mt-6 space-x-2 mb-12">
                                {currentPage > 1 && (
                                    <button 
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text1 hover:bg-light-accent dark:hover:bg-dark-text2 hover:text-white"
                                    >
                                        ←
                                    </button>
                                )}
                                {visiblePages[0] > 1 && (
                                    <span className="px-2 text-light-text dark:text-dark-text1">...</span>
                                )}
                                {visiblePages.map(page => ( 
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                            currentPage === page 
                                                ? 'bg-light-accent dark:bg-dark-text2 text-white' 
                                                : 'bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text1 hover:bg-light-accent dark:hover:bg-dark-text2 hover:text-white'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {visiblePages[visiblePages.length - 1] < totalPages && (
                                    <span className="px-2 text-light-text dark:text-dark-text1">...</span>
                                )}
                                {currentPage < totalPages && (
                                    <button 
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text1 hover:bg-light-accent dark:hover:bg-dark-text2 hover:text-white"
                                    >
                                        →
                                    </button>
                                )}
                            </div>
                        )}

                        </div>
                    </div>
                <div className="w-full lg:w-2/3">
                    
                    <div className="grid grid-cols-1 overflow-hidden gap-3 w-full flex-1">
                        {currentCandidates.length > 0? (
                            currentCandidates.map(c => (
                                <SimpleCandidatesCard key={c.id} {...c}/>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-64">
                                <p className="text-light-text dark:text-dark-text1 text-xl">
                                    Nenhum candidato encontrado com os filtros selecionados.
                                </p>
                            </div>
                        )}
                    </div>
                    
                    
                </div>
            </main>
        </>
    )
}

export default Feed