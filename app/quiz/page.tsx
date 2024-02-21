"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store";

type Props = {};

const page = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});

  const {
    selectedTitleObject,
    currentQuizIndex,
    setCurrentQuizIndex,
    // correctAnswersCount,
    // incrementCorrectAnswersCount,
    addToTotalScore,
    totalScore,
    resetTotalScore,
  } = useQuizStore();

  const handleOptionClick = (option: string) => {
    // Update the selected option
    setSelectedOption(option);
    // Check if the selected option is correct
    const correctAnswer =
      selectedTitleObject?.questions[currentQuizIndex].answer;

    setIsCorrect(option === correctAnswer);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentQuizIndex]: option,
    }));

    if (option === correctAnswer && !selectedOptions[currentQuizIndex]) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    // Reset selected option and correctness state
    setSelectedOption(null);
    setIsCorrect(null);

    // Increment the current quiz index
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  const handlePreviousQuestion = () => {
    // Decrement the current quiz index if it's not the first question
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }

    // // Reset selected option and correctness state
    // setSelectedOption(null);
    // setIsCorrect(null);
  };

  //   const handleQuizSubmit = () => {
  //     addToTotalScore(correctAnswersCount);
  //   };

  const handleQuizSubmit = () => {
    // Calculate correct answers count based on selected options
    const newCorrectAnswersCount = Object.values(selectedOptions).reduce(
      (count, option, index) => {
        const correctAnswer = selectedTitleObject?.questions[index].answer;
        if (option === correctAnswer) {
          return count + 1;
        }
        return count;
      },
      0
    );

    // Update total score with the calculated correct answers count
    addToTotalScore(newCorrectAnswersCount);
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
    setCorrectAnswersCount(0);
    setSelectedOptions({});
    setIsCorrect(null);
    setCorrectAnswersCount(0);
    resetTotalScore(); // Reset submitted score when changing questions
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
                    <li className="mb-5" key={index}>
                      <Button
                        className={`container flex justify-start items-center gap-3 ${
                          selectedOption === option
                            ? isCorrect
                              ? "bg-green-500"
                              : "bg-red-500"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
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
                    disabled={selectedOption === null}
                  >
                    Next
                  </Button>
                )}

                {currentQuizIndex === questionsLength - 1 && (
                  <Button className="w-full" onClick={handleQuizSubmit}>
                    Submit
                  </Button>
                )}
              </div>
              <p>Correct Answers: {totalScore}</p>
            </div>
          </main>
        )}
    </div>
  );
};

export default page;
