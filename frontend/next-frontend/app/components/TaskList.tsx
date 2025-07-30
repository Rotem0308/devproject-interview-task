import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { LabelValueOrder } from "@/types/label-value-order";
import sortMethodMapper from "@/utils/sorts";
import { SortMethods } from "@/enums/sort";
import apiFetch from "@/utils/http";
import { SearchParams } from "@/types/searchParams";

interface TaskSearchParams {
  searchText?: string;
  label?: string;
  value?: string;
  order?: string;
}

const taskNotFoundMsg: string = "No Tasks Were Found";

const TaskList = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params: TaskSearchParams = await searchParams;
  const { searchText, value, order } = params;

  const fetchData = async (): Promise<Task[]> => {
    try {
      const res = await apiFetch("", {
        cache: "no-store",
      });
      const tasksFromDb: Task[] = await res.json();
      console.log(tasksFromDb);
      return tasksFromDb;
    } catch (error) {
      console.log("failed to get tasks");
      return [];
    }
  };
  let filteredAndSortedTasks: Task[] = [];

  const tasks: Task[] = await fetchData();

  console.log(tasks);
  if (searchParams != undefined) {
    filteredAndSortedTasks = generateSortedFilteredTasks(tasks);
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

  function generateSortedFilteredTasks(tasks: Task[]): Task[] {
    let filteredTasks: Task[] = tasks;
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
