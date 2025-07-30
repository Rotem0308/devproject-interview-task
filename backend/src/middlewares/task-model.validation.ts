import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validateUpdateTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, title, description, completed, createdDate } = req.body;
  if (
    typeof id !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean" ||
    isNaN(Date.parse(createdDate))
  )
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "invalid task Data Format" });
  next();
};

export const validateCreateTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, completed, createdDate } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean" ||
    isNaN(Date.parse(createdDate))
  )
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "invalid task Data Format" });
  next();
};
