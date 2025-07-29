import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Task } from "../models/task";
import {
  addTask,
  removeTask,
  fetchAllTasks,
  findTaskById,
  modifyTask,
} from "../services/taskService";
import DomainException from "../exceptions/domain.exception";

export const getAllTasks = (_: Request, res: Response, next: NextFunction) => {
  try {
    const allTasks: Task[] | undefined = fetchAllTasks();
    res.json(allTasks);
  } catch (error) {
    if (error instanceof DomainException) {
      return res.status(error.errorReason).json(error.message);
    }
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const task: Task | undefined = findTaskById(id);
    res.json(task);
  } catch (error) {
    if (error instanceof DomainException) {
      return res.status(error.errorReason).json(error.message);
    }
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await addTask(req.body);
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    if (error instanceof DomainException) {
      return res.status(error.errorReason).json(error.message);
    }
    next(error);
  }
};

export const updateTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await modifyTask(req.body);
    res.json(req.body);
  } catch (error) {
    if (error instanceof DomainException) {
      return res.status(error.errorReason).json(error.message);
    }
    next(error);
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await removeTask(req.body);
    res.json(req.body);
  } catch (error) {
    if (error instanceof DomainException) {
      return res.status(error.errorReason).json(error.message);
    }
    next(error);
  }
};
