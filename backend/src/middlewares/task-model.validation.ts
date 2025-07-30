import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const validateTaskBody = (req: Request, res: Response, next: NextFunction) => {
  const { id, title, description, completed, createdDate } = req.body;
  if (
    typeof id !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean" ||
    !(createdDate instanceof Date)
  )
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "invalid task Data Format" });
  next();
};

export default validateTaskBody;
