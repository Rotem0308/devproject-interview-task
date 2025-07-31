import { CreateTaskDto, Task } from "@/types/task";

const BASE_URL =
  process.env.BACKEND_API_URL || "http://localhost:8080/api/items/";

export async function apiFetch(
  path: string = "",
  options?: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error While Fetching Without A Message`
      );
    }

    return response;
  } catch (err) {
    console.error("API fetch error:", err);
    throw err; // Let the caller decide what to do
  }
}

export default apiFetch;

export async function getTask(taskId: string): Promise<Response> {
  return await apiFetch(`${taskId}`, {
    method: "GET",
  });
}

export async function deleteTask(taskId: string): Promise<void> {
  await apiFetch(`${taskId}`, {
    method: "DELETE",
  });
}

export async function createTask(taskData: CreateTaskDto): Promise<void> {
  await apiFetch("", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(taskData: Task): Promise<void> {
  await apiFetch(`${taskData.id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}
