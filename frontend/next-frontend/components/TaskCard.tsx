import { Task } from "@/types/task";
import { CircleCheckBig, CircleDashed, Trash } from "lucide-react";
import React from "react";

const TaskCard = () => {
  const task: Task = {
    id: 1,
    title: "Muza",
    description: "My Dolls Got Lost",
    completed: false,
    createdDate: new Date(2025, 2, 3),
  };
  return (
    <div className="flex flex-col gap-5 p-4 border-1 border-gray-400 rounded-sm shadow-lg ">
      <div className="flex justify-between items-center">
        <p>{task.title}</p>
        <Trash color="red" cursor={"pointer"} />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="text-xs font-bold">{task.createdDate.toUTCString()}</p>
        <p>
          {task.completed ? (
            <CircleCheckBig color="green" />
          ) : (
            <CircleDashed color="orange" />
          )}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
