"use client";
import { modalTypes, modalTypeStyles } from "@/consts/generic";
import React, { useEffect, useState } from "react";

type ModalProps = {
  message: string;
  type: modalTypes;
  onClose: () => void;
  delay?: number;
};

const Modal = ({ message, type, onClose, delay = 3000 }: ModalProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const modalTimer = setTimeout(() => {
      onClose();
    }, delay + 500);
    const modalAffectTimer = setTimeout(() => {
      setVisible(false);
    }, delay);

    return () => {
      clearTimeout(modalAffectTimer);
      clearTimeout(modalTimer);
    };
  }, []);
  return (
    <div
      className={`fixed bottom-10 right-10 z-100 bg-transparent transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`p-4 rounded shadow-sm border-2 bg-amber-50 ${modalTypeStyles[type]}`}
      >
        <p className="flex justify-center items-center">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
