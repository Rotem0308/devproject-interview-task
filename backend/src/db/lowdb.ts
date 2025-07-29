import { Low } from "lowdb/lib";
import { JSONFilePreset } from "lowdb/node";
import { join } from "path";
import { Task } from "../models/task";

type Data = {
  tasks: Task[];
};

type DBContext = Low<Data> | undefined;

let dbContext: DBContext = undefined;

const defaultData: Data = {
  tasks: [
    {
      id: 1,
      title: "Random Task1",
      completed: false,
    },
    {
      id: 2,
      title: "Random Task2",
      completed: true,
    },
    {
      id: 3,
      title: "Random Task3",
      completed: false,
    },
  ],
};

const filePath: string = join(process.cwd(), "db", "db.json");

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
