import { sortingOrder } from "@/consts/generic";
import { SortMethods } from "@/enums/sort";

const sortMethodMapper = (sortMethod: SortMethods): Function | null => {
  switch (sortMethod) {
    case SortMethods.Name:
      return sortByName;
    case SortMethods.Date:
      return sortByDate;
    case SortMethods.Status:
      return sortByStatus;
    default:
      return null;
  }
};

export function sortByDate<T>(
  items: T[],
  key: keyof T,
  sortOrder: sortingOrder
): T[] {
  items.sort((a, b) => {
    const dateA: number = new Date(a[key] as Date).getTime();
    const dateB: number = new Date(b[key] as Date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
  return items;
}
export function sortByName<T>(
  items: T[],
  key: keyof T,
  sortOrder: "asc" | "desc"
): T[] {
  return items.sort((a, b) => {
    const nameA: string = String(a[key]);
    const nameB: string = String(b[key]);
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}
export function sortByStatus<T>(
  items: T[],
  key: keyof T,
  sortOrder: "asc" | "desc"
): T[] {
  return items.sort((a, b) => {
    const statusA: number = Number(a[key]);
    const statusB: number = Number(b[key]);
    return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
  });
}

export default sortMethodMapper;
