import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { LabelValueOrder } from "@/types/label-value-order";
import sortMethodMapper from "@/utils/sorts";
import { SortMethods } from "@/enums/sort";
import apiFetch from "@/utils/http";

interface TaskListProps {
  searchText: string;
  sortOption?: LabelValueOrder;
}

const taskNotFoundMsg: string = "No Tasks Where Found";

const TaskList = ({ searchText, sortOption }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch();
      const tasksFromDb: Task[] = await res.json();
      console.log(tasksFromDb);
      setTasks(tasksFromDb);
    };
    fetchData();
  }, []);
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  handleSort();

  return (
    <div
      className="
      grid gap-2 w-full 
      sm:grid-cols-1 sm:w-[90%] md:grid-cols-2 
      "
    >
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })
      ) : (
        <span>{taskNotFoundMsg}</span>
      )}
    </div>
  );

  function handleSort() {
    if (sortOption) {
      const sortFunc: Function | null = sortMethodMapper(sortOption.value);
      if (sortFunc) {
        const keyName: string | null = getKeyName(sortOption.value);
        sortFunc(filteredTasks, keyName, sortOption.order);
      }
    }
  }

  function getKeyName(sortOption: SortMethods): string | null {
    switch (sortOption) {
      case SortMethods.Name:
        return "title";
      case SortMethods.Date:
        return "createdDate";
      case SortMethods.Status:
        return "completed";
      default:
        return null;
    }
  }
};

export default TaskList;
