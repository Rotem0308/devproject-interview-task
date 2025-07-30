import { Task } from "@/types/task";
import apiFetch from "@/utils/http";
import React from "react";

const TaskInfo = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const errorClass =
    "flex justify-center items-center text-6xl h-full w-full text-red-400";
  try {
    const res = await apiFetch(`${id}`, {
      cache: "no-store", // will be updated
    });
    if (!res.ok) {
      return <div className={errorClass}>Task Was Not Found</div>;
    }
    const task: Task = await res.json();

    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>{task.completed ? "Task Complete" : "Task In Progress"}</p>
        <p>{task.createdDate}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className={errorClass}>Error While Fetching Data From Server</div>
    );
  }
};

// const TaskInfo1 = ({ task }: { task: Task }) => {
//   if (!task) return <div>Task Was Not Found</div>;

//   return (
//     <div className="flex flex-col justify-center items-center h-full">
//       <p>{task.title}</p>
//       <p>{task.description}</p>
//       <p>{task.completed ? "Task Complete" : "Task In Progress"}</p>
//       <p>{task.createdDate}</p>
//     </div>
//   );
// }

// export async function getServerSideProps(context: { params: { id: string } }) {
//   const { id } = context.params;
//   try {
//     const res = await apiFetch(`${id}`);
//     if (!res.ok) {
//       return { props: { task: null } };
//     }
//     const task = await res.json();
//     return { props: { task } };
//   } catch {
//     return { props: { task: null } };
//   }
// }
export default TaskInfo;
