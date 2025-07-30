import TaskBoard from "@/app/components/TaskBoard";
import React from "react";

const Home = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="mb-20 font-bolder text-4xl sm:text-5xl font-manrope text-center w-[70%]">
        <span>Turn your goals into action — </span>
        <span className="main-app-text-grediant font-mono text-5xl sm:text-6xl font-bold">
          start mastering your tasks now.
        </span>
      </div>
      <TaskBoard searchParams={searchParams} />
    </div>
  );
};

export default Home;
