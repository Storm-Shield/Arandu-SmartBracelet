import fs from "fs/promises"

const DATA_PATH = "./data/Candidates.json"

class CandidatesRepository{
    
    async listAll(){
        try{
            const data = await fs.readFile(DATA_PATH,"utf-8")
            const candidates = JSON.parse(data)
            return candidates
        }catch (error){
            throw new Error("List data: "+ error)
        }
    
    }

    async listTopics(){
        try{
            const candidates = await this.listAll()
            const cities = [...new Set(candidates.map(c => {
                const parts = c.localization.split('/')
                return parts[0]
            }))]
            const area = [...new Set(candidates.map(c => c.area))]
            return {
                "areas": area, 
                "cities": cities, 
        }
        }catch (error){
           throw new Error("List Topics: " + error) 
        }
       
    }

    async filterById(id){
        try{
            if (!id){
                throw new Error("Invalid paramether")
            }
            
            const candidates = await this.listAll()
        return candidates.find(c => c.id === parseInt(id))
        }catch(error){
             throw new Error("Candidate not fund!")
        }
        
    }

    _normalizedText(text){
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    async filterByTopics(city, workArea){
        try{

            if (!city && !workArea){
                throw new Error("At least one filter must be specified.")
            }

            const candidates = await this.listAll()
            return candidates.filter(c => {
                
                const normalizedLocalization = this._normalizedText(c.localization)
                const normalizedArea = this._normalizedText(c.area)
                const normalizedCity = city ? this._normalizedText(city) : null
                const normalizedWorkArea = workArea ? this._normalizedText(workArea) : null

                if (city && workArea){
                    return normalizedLocalization.includes(normalizedCity) && normalizedArea.includes(normalizedWorkArea)
                }else if (!city && workArea){
                    return normalizedArea.includes(normalizedWorkArea)
                }else if (city && !workArea){
                    return normalizedLocalization.includes(normalizedCity)
                }
        })
        }catch (error){
            throw new Error("FilterByTopics: " + error)
        }
        
    }
}

export default CandidatesRepository