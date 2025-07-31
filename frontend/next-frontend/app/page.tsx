import TaskBoard from "@/app/components/TaskBoard";
import { SearchParams } from "@/types/searchParams";
import React from "react";

const Home = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="p-4 h-full flex flex-col items-center">
      <h1 className="mb-20 font-bolder text-4xl sm:text-5xl font-manrope text-center w-[70%]">
        <span>Turn your goals into action — </span>
        <span className="main-app-text-grediant font-mono text-5xl sm:text-6xl font-bold">
          start mastering your tasks now.
        </span>
      </h1>
      <TaskBoard searchParams={searchParams} />
    </div>
  );
};

export default Home;
