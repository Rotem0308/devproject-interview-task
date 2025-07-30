"use client";
import { deleteTask } from "@/utils/http";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface RemoveFromTasksProps {
  taskId: string;
}
const RemoveFromTasks = ({ taskId }: RemoveFromTasksProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteTask(taskId);
    router.refresh();
  };

  return (
    <>
      <Trash color="red" cursor={"pointer"} onClick={handleDelete} />
    </>
  );
};

export default RemoveFromTasks;
