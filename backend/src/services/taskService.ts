import { getDbContext } from "../db/lowdb";
import { Task } from "../models/task";
import getCollection, { generateIdForNewCollectionItem } from "../db/db.util";
import DomainException from "../exceptions/domain.exception";
import { StatusCodes } from "http-status-codes";

const dbContext = getDbContext();

export const fetchAllTasks = (): Task[] | undefined => {
  const allTasks: Task[] | undefined = getCollection("tasks");
  if (!allTasks)
    throw new DomainException(
      "no tasks in the tasks collection in DB",
      StatusCodes.NO_CONTENT
    );
  return allTasks;
};

export const findTaskById = (id: string): Task | undefined => {
  const allTasks: Task[] | undefined = getCollection("tasks");
  if (!allTasks)
    throw new DomainException(
      "no tasks in the tasks collection in DB",
      StatusCodes.NO_CONTENT
    );

  const task = allTasks.find((task) => task.id == id);
  if (!task)
    throw new DomainException(
      "no tasks in the tasks collection in DB",
      StatusCodes.NOT_FOUND
    );
  return task;
};

export const addTask = async (taskData: Task): Promise<Task> => {
  try {
    const task: Task = {
      id: generateIdForNewCollectionItem("tasks"),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdDate: taskData.createdDate,
    };

    await dbContext?.update((data) => {
      data.tasks.push(task);
    });

    await dbContext?.write();
    return task;
  } catch (error) {
    console.error("failed to create a new task", error);
    throw new DomainException(
      `failed to create a new task`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const modifyTask = async (taskData: Task): Promise<void> => {
  try {
    await dbContext?.update((data) => {
      let taskToUpdate = data.tasks.find((task) => task.id == taskData.id);
      if (!taskToUpdate)
        throw new DomainException(
          `task with Id ${taskData.id} was not found`,
          StatusCodes.NOT_FOUND
        );
      Object.assign(taskToUpdate, taskData);
    });
    await dbContext?.write();
  } catch (error) {
    console.error(`failed to update task with the id ${taskData.id}`, error);
    throw new DomainException(
      `failed to update task with the id ${taskData.id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const removeTask = async (id: string): Promise<void> => {
  try {
    await dbContext?.update((data) => {
      let taskToDelete = data.tasks.find((task) => task.id == id);
      if (!taskToDelete)
        throw new DomainException(
          `task with Id ${id} was not found`,
          StatusCodes.NOT_FOUND
        );
      data.tasks = data.tasks.filter((task) => task.id != id);
    });
    await dbContext?.write();
  } catch (error) {
    console.error(`failed to delete task with the id ${id}`, error);
    throw new DomainException(
      `failed to delete task with the id ${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
