import { api } from "./api";

export const QuestionsService = {
    getAll: () => api.request('/questions')
}