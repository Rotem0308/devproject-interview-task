const BASE_URL =
  process.env.BACKEND_API_URL || "http://localhost:8080/api/items/";

export async function apiFetch(path: string = "", options?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, options);
}
export default apiFetch;
