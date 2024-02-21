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
  totalScore: number;
  addToTotalScore: (score: number) => void;
  resetTotalScore: () => void; // New function to reset total score
  scoreAdded: boolean; // Added flag to track if score has been added
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

        totalScore: 0,

        scoreAdded: false, // Initialize scoreAdded flag to false

        addToTotalScore: (score: number) => {
          if (!get().scoreAdded) {
            set((state) => ({
              totalScore: state.totalScore + score,
              scoreAdded: true, // Set scoreAdded flag to true
            }));
          }
        },
        resetTotalScore: () => set({ totalScore: 0, scoreAdded: false }), // Reset scoreAdded flag when resetting totalScore
      }),
      {
        name: "quiz-storage",
      }
    )
  )
);
