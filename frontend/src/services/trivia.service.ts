import api from './api';
import type { Trivia, Question, AnswerInput, AttemptResult } from '../types/trivia';

export const triviaApi = {
  list: (params?: { category?: string; difficulty?: string }) => api.get<Trivia[]>('/trivias', { params }),
  getById: (id: string) => api.get<Trivia>(`/trivias/${id}`),
  getQuestions: (id: string) => api.get<Question[]>(`/trivias/${id}/questions`),
  submitAttempt: (triviaId: string, answers: AnswerInput[]) => api.post<AttemptResult>(`/trivias/${triviaId}/attempts`, { answers }),
};
