import { sortingOrder } from "@/consts/generic";
import { SortMethods } from "@/enums/sort";

export type LabelValue = {
  label: string;
  value: string | number;
};
export type LabelValueOrder = {
  label: string;
  value: SortMethods;
  order: sortingOrder;
};
