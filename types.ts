export interface Quiz {
    title: string;
    icon: string;
    questions: Question[];
  }
  
  export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface QuizDataTypes {
    quizzes: Quiz[];
  }