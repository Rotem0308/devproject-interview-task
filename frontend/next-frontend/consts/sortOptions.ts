import { SortMethods } from "@/enums/sort";
import { LabelValueOrder } from "@/types/label-value-order";

export const SORT_OPTIONS: LabelValueOrder[] = [
  { label: "Sort by From A-Z", value: SortMethods.Name, order: "asc" },
  { label: "Sort by From Z-A", value: SortMethods.Name, order: "desc" },
  { label: "Sort by Date Ascending", value: SortMethods.Date, order: "asc" },
  { label: "Sort by Date Descending", value: SortMethods.Date, order: "desc" },
  {
    label: "Sort by Status Ascending",
    value: SortMethods.Status,
    order: "asc",
  },
  {
    label: "Sort by Status Descending",
    value: SortMethods.Status,
    order: "desc",
  },
];
