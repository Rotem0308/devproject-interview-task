import { LabelValueOrder } from "@/types/label-value-order";
import React, { ChangeEvent } from "react";

interface SelectProps {
  onSelect: Function;
  options: LabelValueOrder[];
  selectClassName?: string;
  optionClassName?: string;
}
const SortDropdown = ({
  onSelect,
  options,
  selectClassName,
  optionClassName,
}: SelectProps) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value);
    console.log(options[value]);
    onSelect({ ...options[value] });
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
