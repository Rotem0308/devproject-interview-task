"use client";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import TaskList from "./TaskList";
import SortDropdown from "./SortDropdown";
import { SORT_OPTIONS } from "@/consts/sortOptions";
import { LabelValueOrder } from "@/types/label-value-order";

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [sortOption, setSortOption] = useState<LabelValueOrder>();
  return (
    <section
      className="
    flex flex-col items-center w-full gap-3
    sm:w-[80%] 
    "
    >
      <div
        className="
      flex flex-col justify-evenly items-center w-[90%] gap-5 
      sm:flex-row
      "
      >
        <SortDropdown onSelect={setSortOption} options={SORT_OPTIONS} />
        <SearchInput onSearch={setSearchText} />
      </div>
      <TaskList searchText={searchText} sortOption={sortOption} />
    </section>
  );
};

export default TaskBoard;
