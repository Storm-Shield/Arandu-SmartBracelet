import { api } from "./api";

export const CandidatesService = {
    getAll: () => api.request('/candidates/'),
    getTopics: () => api.request('/candidates/topics'),
    getByID: (id) => api.request(`/candidates/candidate/${id}`), 
    getByTopic: (city, area) => api.request(`/candidates/filter?city=${city}&area=${area}`)
}