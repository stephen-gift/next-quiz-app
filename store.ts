import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { QuizData } from "./types";

// import type {} from '@redux-devtools/extension' // required for devtools typing

export interface QuizStore {
  currentQuizIndex: number;
  setCurrentQuizIndex: (index: number) => void;
  quizData: QuizData | null;
  setQuizData: (data: QuizData) => void;
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentQuizIndex: 0,
        setCurrentQuizIndex: (index: number) =>
          set({ currentQuizIndex: index }),
        quizData: null,
        setQuizData: (data: QuizData) => set({ quizData: data }),
      }),
      {
        name: "quiz-storage",
      }
    )
  )
);
