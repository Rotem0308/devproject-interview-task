import { modalTypes } from "@/consts/generic";

export type ModalState = {
  isActive: boolean;
  message: string;
  type: modalTypes;
};
