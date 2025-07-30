import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { LabelValueOrder } from "@/types/label-value-order";
import sortMethodMapper from "@/utils/sorts";
import { SortMethods } from "@/enums/sort";
import apiFetch from "@/utils/http";

interface SearchParams {
  searchText?: string;
  label?: string;
  value?: string;
  order?: string;
}

const taskNotFoundMsg: string = "No Tasks Were Found";

const TaskList = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { searchText, value, order } = await searchParams;
  let filteredAndSortedTasks: Task[] = [];

  const fetchData = async (): Promise<Task[]> => {
    const res = await apiFetch();
    const tasksFromDb: Task[] = await res.json();
    console.log(tasksFromDb);
    return tasksFromDb;
  };

  const tasks: Task[] = await fetchData();

  if (searchParams != undefined) {
    filteredAndSortedTasks = generateSortedFilteredTasks();
  }

  return (
    <div
      className="
      grid gap-2 w-full 
      sm:grid-cols-1 sm:w-[90%] md:grid-cols-2 
      "
    >
      {filteredAndSortedTasks.length > 0 ? (
        filteredAndSortedTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })
      ) : (
        <span>{taskNotFoundMsg}</span>
      )}
    </div>
  );

  function generateSortedFilteredTasks(): Task[] {
    let filteredTasks: Task[] = [];
    if (searchText != undefined) {
      filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (value != undefined && order != undefined) {
      const sortFunc: Function | null = sortMethodMapper(Number(value));
      if (sortFunc) {
        const keyName: string | null = getKeyName(Number(value));
        sortFunc(filteredTasks, keyName, order);
      }
    }
    return filteredTasks;
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
