"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const quiz = searchParams.get("quiz");
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex-1">
        <p>Question 1 / 10</p>
        <h1>Which CSS property controls the text size?</h1>
      </div>
      <div className="flex-1 ">
        <ul className="">
          <li className="mb-5">
            <Button className="container flex justify-start items-center gap-3">
              1 <p> text-size</p>
            </Button>
          </li>
          <li className="mb-5">
            <Button className="container flex justify-start items-center gap-3">
              2 <p> text-size</p>
            </Button>
          </li>
          <li className="mb-5">
            <Button className="container flex justify-start items-center gap-3">
              3 <p> text-size</p>
            </Button>
          </li>
          <li className="mb-5">
            <Button className="container flex justify-start items-center gap-3">
              4 <p> text-size</p>
            </Button>
          </li>
        </ul>
        <Button className="w-full">Submit</Button>
      </div>
    </main>
  );
};

export default page;
