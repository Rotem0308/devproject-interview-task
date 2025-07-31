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

const taskNotFoundMsg: string = "No results match the entered value";

const TaskList = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params: TaskSearchParams = await searchParams;
  const { searchText, value, order } = params;

  let tasks: Task[] = [];

  try {
    const res = await apiFetch("", {
      cache: "no-store",
    });
    const hasBodyContent =
      res.headers.get("content-length") &&
      res.headers.get("content-length") != "0";

    if (!res.ok || !hasBodyContent) {
      const errorData = hasBodyContent && (await res.json());
      return <p className="error">{errorData?.message || res.statusText}</p>;
    }

    tasks = await res.json();
  } catch (error) {
    if (error instanceof Error) {
      return <p className="error">{error.message}</p>;
    }
  }

  let filteredAndSortedTasks: Task[] = [];

  if (searchParams != undefined) {
    filteredAndSortedTasks = generateSortedFilteredTasks(tasks);
  }

  if (filteredAndSortedTasks.length <= 0) {
    return (
      <p className="flex justify-center items-center text-3xl">
        {taskNotFoundMsg}
      </p>
    );
  }

  return (
    <div
      className="
      grid gap-2 w-full 
      sm:grid-cols-1 sm:w-[90%] md:grid-cols-2  lg:grid-cols-3
      "
    >
      {filteredAndSortedTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
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
