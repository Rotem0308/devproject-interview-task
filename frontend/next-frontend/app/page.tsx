import TaskBoard from "@/components/TaskBoard";
import React from "react";

const Home = () => {
  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="mb-20 font-bolder text-5xl font-manrope text-center w-[70%]">
        <span>Turn your goals into action — </span>
        <span className="main-app-text-grediant font-mono text-6xl font-bold">
          start mastering your tasks now.
        </span>
      </div>
      <TaskBoard />
    </div>
  );
};

export default Home;
