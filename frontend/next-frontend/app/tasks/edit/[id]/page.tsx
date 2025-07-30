import TaskForm from "@/app/components/TaskForm";
import React from "react";

const EditTask = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <TaskForm taskId={id} />
    </div>
  );
};

export default EditTask;
