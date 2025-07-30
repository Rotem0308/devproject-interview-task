import { Task } from "@/types/task";
import { CircleCheckBig, CircleDashed, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import RemoveFromTasks from "./RemoveFromTasks";

interface TaskProps {
  task: Task;
}

const TaskCard = ({ task }: TaskProps) => {
  const taskDate = new Date(task.createdDate).toLocaleDateString();
  return (
    <div className="flex flex-col gap-5 p-6 px-8 border-1 border-gray-400 rounded-sm shadow-lg  w-auto">
      <div className="flex justify-between items-center">
        <p>{task.title}</p>
        <RemoveFromTasks taskId={task.id} />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="text-md font-bold">{taskDate}</p>
        <p>
          {task.completed ? (
            <CircleCheckBig color="green" />
          ) : (
            <CircleDashed color="orange" />
          )}
        </p>
      </div>
      <Link
        href={`/tasks/${task.id}`}
        className="w-fit p-2 rounded-sm hover:rounded-md bg-blue-300 hover:bg-blue-400 shadow-md transition-colors transition-normal duration-500"
      >
        Info
      </Link>
    </div>
  );
};

export default TaskCard;
