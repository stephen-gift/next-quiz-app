import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Quiz, QuizDataTypes } from "./types";

// import type {} from '@redux-devtools/extension' // required for devtools typing

export interface QuizStore {
  currentQuizIndex: number;
  setCurrentQuizIndex: (index: number) => void;
  quizData: QuizDataTypes | null;
  setQuizData: (data: QuizDataTypes) => void;
  selectedTitle: string | null;
  setSelectedTitle: (title: string | null) => void;
  selectedTitleObject: Quiz | null;
  correctAnswersCount: number;
  incrementCorrectAnswersCount: () => void;
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentQuizIndex: 0,
        setCurrentQuizIndex: (index: number) =>
          set({ currentQuizIndex: index }),
        quizData: null,
        setQuizData: (data: QuizDataTypes) => set({ quizData: data }),
        selectedTitle: null,
        setSelectedTitle: (title: string | null) => {
          set({ selectedTitle: title });
          // Find the corresponding quiz object based on the selected title
          if (title && get().quizData) {
            const selectedQuiz = get().quizData?.quizzes.find(
              (quiz) => quiz.title === title
            );
            set({ selectedTitleObject: selectedQuiz || null });
          } else {
            set({ selectedTitleObject: null });
          }
        },
        selectedTitleObject: null,
        correctAnswersCount: 0,
        incrementCorrectAnswersCount: () =>
          set((state) => ({
            correctAnswersCount: state.correctAnswersCount + 1,
          })),
      }),
      {
        name: "quiz-storage",
      }
    )
  )
);
