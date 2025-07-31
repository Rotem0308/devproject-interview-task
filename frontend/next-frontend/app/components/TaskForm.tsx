"use client";
import { CreateTaskDto, Task } from "@/types/task";
import { createTask, getTask, updateTask } from "@/utils/http";
import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { ModalState } from "@/types/modal";

type FormValues = CreateTaskDto | Task;

const TaskForm = ({ taskId }: { taskId?: string | undefined }) => {
  const editMode = taskId != undefined;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    isActive: false,
    type: "success",
    message: "",
  });
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: editMode
      ? undefined
      : {
          title: "",
          description: "",
          completed: false,
          createdDate: new Date().toDateString(),
        },
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      setLoading(true);
      try {
        const res = await getTask(taskId); // your API helper
        const task: Task = await res.json();
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve("finish");
          }, 5000)
        );
        reset(task); // prefill the form
      } catch (error) {
        console.error("Failed to fetch task", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, reset]);

  const onSubmit = async (data: Task | CreateTaskDto) => {
    try {
      editMode
        ? await updateTask(data as Task)
        : await createTask(data as CreateTaskDto);
      !editMode && reset();
      setModal((prev) => {
        return {
          ...prev,
          message: `${editMode ? "Updated" : "Created"} Successfully!`,
          isActive: true,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center shadow-2xl bg-cover bg-center w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] h-[80%] bg-[url(/updateForm-bg.jfif)]">
      {!loading ? (
        <>
          {serverError && <p className="error">{serverError}</p>}
          <p className="py-5 text-4xl font-bold text-white select-none">
            {editMode ? "Update" : "Create"} Task
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-evenly gap-8 backdrop-blur w-full h-full px-10 sm:px-20"
          >
            <div className="flex flex-col gap-2 text-2xl">
              <label
                htmlFor="title"
                className="select-none text-white text-shadow-md text-shadow-black"
              >
                Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                })}
                id="title"
                type="text"
                className="border-b-2 text-lg outline-0"
              />

              {errors.title && (
                <div className="flex items-center gap-3 bg-red-200 px-5 py-1 rounded-xs">
                  <CircleX color="#ff0000" />
                  <p className="text-red-500 p-1 text-lg ">
                    {errors.title.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 text-2xl">
              <label
                htmlFor="desc"
                className="select-none text-white text-shadow-md text-shadow-black"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                id="desc"
                cols={10}
                rows={10}
                className="resize-none text-sm p-2 rounded bg-gray-100 w-full h-32 outline-0"
              />
              {errors.description && (
                <div className="flex items-center gap-3 bg-red-200 px-5 py-1 rounded-xs">
                  <CircleX color="#ff0000" />
                  <p className="text-red-500 p-1 text-lg">
                    {errors.description.message}
                  </p>
                </div>
              )}
            </div>

            {editMode && (
              <div className="flex justify-center items-center gap-20 text-2xl">
                <label
                  htmlFor="status"
                  className="select-none text-white text-shadow-md text-shadow-black"
                >
                  Completed
                </label>
                <input
                  {...register("completed")}
                  id="status"
                  type="checkbox"
                  className="cursor-pointer w-5 h-5 rounded-10xl"
                />
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
            border-0 outline-0
            hover:bg-sky-600 disabled:hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-25 transition-colors duration-300
            bg-sky-400 text-white rounded-3xl w-[70%] py-2 cursor-pointer 
            "
              >
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-3xl text-white text-shadow-md text-shadow-amber-700">
          Loading...
        </p>
      )}
      {modal.isActive && (
        <Modal
          message={modal.message}
          type="success"
          onClose={() =>
            setModal((prev) => {
              return { ...prev, isActive: false };
            })
          }
        />
      )}
    </div>
  );
};

export default TaskForm;
