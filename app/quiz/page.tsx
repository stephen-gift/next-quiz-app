"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store";

type Props = {};

const page = (props: Props) => {
  const {
    selectedTitle,
    selectedTitleObject,
    currentQuizIndex,
    setCurrentQuizIndex,
  } = useQuizStore();
  const searchParams = useSearchParams();

  const handleNextQuestion = () => {
    // Increment the current quiz index
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  const handlePreviousQuestion = () => {
    // Decrement the current quiz index if it's not the first question
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  // Function to convert index to option letter (A, B, C, D)
  const indexToLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  const questionsLength = selectedTitleObject
    ? selectedTitleObject.questions.length
    : 0;

  // Initialize currentIndex to 0 when the component mounts
  useEffect(() => {
    setCurrentQuizIndex(0);
  }, []);

  return (
    <div>
      {selectedTitleObject &&
        selectedTitleObject.questions[currentQuizIndex] && (
          <main className="flex min-h-screen flex-row items-center justify-between p-24">
            <div className="flex-1">
              <p>
                Question {currentQuizIndex + 1} / {questionsLength}
              </p>
              <h1>
                {selectedTitleObject.questions[currentQuizIndex].question}
              </h1>
            </div>
            <div className="flex-1 ">
              <ul className="">
                {selectedTitleObject.questions[currentQuizIndex].options.map(
                  (option, index) => (
                    <li className="mb-5">
                      <Button className="container flex justify-start items-center gap-3">
                        {/* Render option letter (A, B, C, D) */}
                        {indexToLetter(index)}. {"  "}
                        {option}
                      </Button>
                    </li>
                  )
                )}
              </ul>

              <div className="flex justify-between gap-5">
                {/* Conditionally render the Previous button */}
                {currentQuizIndex > 0 && (
                  <Button
                    className="w-full mb-5"
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </Button>
                )}

                {currentQuizIndex < questionsLength - 1 && (
                  <Button
                    className="w-full mb-5"
                    onClick={handleNextQuestion}
                    disabled={currentQuizIndex === questionsLength - 1}
                  >
                    Next
                  </Button>
                )}

                {currentQuizIndex === questionsLength - 1 && (
                  <Button className="w-full">Submit</Button>
                )}
              </div>
            </div>
          </main>
        )}
    </div>
  );
};

export default page;
