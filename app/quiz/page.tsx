"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const quiz = searchParams.get("quiz");
  return (
    <main>
      <div></div>
      <div></div>Here's the title: {title}
      {quiz}
    </main>
  );
};

export default page;
