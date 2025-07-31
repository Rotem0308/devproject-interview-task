import { Task } from "@/types/task";
import apiFetch from "@/utils/http";
import React from "react";

const TaskInfo = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  let task: Task | null = null;

  try {
    const res = await apiFetch(`${id}`, {
      cache: "no-store", // will be updated
    });

    const hasBodyContent =
      res.headers.get("content-length") &&
      res.headers.get("content-length") != "0";

    if (!res.ok || !hasBodyContent) {
      const errorData = hasBodyContent && (await res.json());
      return <p className="error">{errorData?.message || res.statusText}</p>;
    }
    task = await res.json();
  } catch (error) {
    if (error instanceof Error) {
      return <p className="error">{error.message}</p>;
    }
  }

  if (!task) {
    return <p className="error">The requested Task was not found</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        <p className="text-gray-600">{task.description}</p>
        <p
          className={`font-medium ${
            task.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {task.completed ? "Task Complete" : "Task In Progress"}
        </p>
        <p className="text-sm text-gray-400">
          Created at: {new Date(task.createdDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
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
