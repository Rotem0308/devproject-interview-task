import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller";
import {
  validateCreateTaskBody,
  validateUpdateTaskBody,
} from "../middlewares/task-model.validation";

const router: Router = Router();

router.get("", getAllTasks);
router.get("/:id", getTaskById);
router.post("", validateCreateTaskBody, createTask);
router.put("/:id", validateUpdateTaskBody, updateTaskById);
router.delete("/:id", deleteTaskById);

export default router;
