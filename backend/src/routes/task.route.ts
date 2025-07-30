import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller";
import validateTaskBody from "../middlewares/task-model.validation";

const router: Router = Router();

router.get("", getAllTasks);
router.get("/:id", getTaskById);
router.post("", validateTaskBody, createTask);
router.put("", validateTaskBody, updateTaskById);
router.delete("/:id", deleteTaskById);

export default router;
