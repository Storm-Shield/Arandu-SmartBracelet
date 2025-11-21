const URL_BASE = "http://localhost:5000"

export const api = {
    async request(endpoint, options = {}){
        const url = `${URL_BASE}${endpoint}`

        const response = await fetch(url, {
            headers:{ 
                'Content-Type': 'application/json', 
                ...options.headers
        }, ...options

            
        })

        if (!response.ok){
            throw new Error("API error: "+ response.status)
        }

        return response.json()
    }
}