// "use client";
import Link from "next/link";
import {
  FaChevronRight,
  FaCss3,
  FaHtml5,
  FaJs,
  FaWheelchair,
} from "react-icons/fa";
import { QuizData } from "../data/data";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export default function Home({ title }: Props) {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex-1">
        <h1>
          Welcome to the
          <strong>Front-end Quiz!</strong>
        </h1>
        <p>Pick a subject to get started</p>
      </div>
      <div className="flex flex-col flex-1">
        {QuizData.quizzes.map((quiz, index) => {
          let icon = null;

          switch (quiz.title) {
            case "HTML":
              icon = <FaHtml5 />;
              break;
            case "CSS":
              icon = <FaCss3 />;
              break;
            case "JavaScript":
              icon = <FaJs />;
              break;
            case "Accessibility":
              icon = <FaWheelchair />;
              break;
            default:
              break;
          }

          return (
            <Link
              key={index}
              href={{
                pathname: `/quiz`,
                query: {
                  title: quiz.title,
                  quiz: JSON.stringify(quiz),
                },
              }}
              className="container flex-1 mb-10"
              // onClick={() => console.log(`Here is the subject:${quiz.title}`)}
            >
              <Button className="container justify-between group">
                {icon}
                {quiz.title}
                <FaChevronRight className="opacity-0 group-hover:opacity-100" />
              </Button>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
