import { Low } from "lowdb/lib";
import { JSONFilePreset } from "lowdb/node";
import { join } from "path";
import { Task } from "../models/task";

export type Data = {
  tasks: Task[];
};

type DBContext = Low<Data> | undefined;

let dbContext: DBContext = undefined;

const defaultData: Data = {
  tasks: [
    {
      id: "1",
      title: "Random Task1",
      description: "Super Task",
      completed: false,
      createdDate: new Date(2025, 3, 1),
    },
    {
      id: "2",
      title: "Random Task2",
      description: "Super Task2",
      completed: true,
      createdDate: new Date(2022, 5, 1),
    },
    {
      id: "3",
      title: "Random Task3",
      description: "Super Task3",
      completed: false,
      createdDate: new Date(2021, 3, 4),
    },
  ],
};

const filePath: string = join(process.cwd(), "src", "db", "db.json");

export const getDbContext = (): DBContext => dbContext;

const connectToDb = async () => {
  try {
    dbContext = await JSONFilePreset<Data>(filePath, defaultData);
    console.log("Connected Successfully to lowDB");
  } catch (error) {
    console.error("Db connection failed", error);
    throw new Error("Failed to initialized DB connection");
  }
};

export default connectToDb;
