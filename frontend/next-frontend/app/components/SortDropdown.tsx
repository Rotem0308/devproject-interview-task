"use client";
import { LabelValueOrder } from "@/types/label-value-order";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface SelectProps {
  options: LabelValueOrder[];
  selectClassName?: string;
  optionClassName?: string;
}
const SortDropdown = ({
  options,
  selectClassName,
  optionClassName,
}: SelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { label, value, order } = options[Number(event.target.value)];
    const params = new URLSearchParams(searchParams);

    params.set("label", label);
    params.set("value", value.toString());
    params.set("order", order);

    router.push(`?${params.toString()}`);
    // onSelect({ ...options[value] });
  };

  return (
    <div>
      <select
        className={selectClassName || "cursor-pointer outline-0"}
        onChange={handleSelect}
      >
        <option value="" disabled>
          SortBy
        </option>
        {options.map((sortOption, index) => (
          <option
            className={
              optionClassName ||
              "focus:ring-2 focus:ring-sea-normal focus:border-sea-normal px-4 py-2 pr-8"
            }
            key={index}
            value={index}
          >
            {sortOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
