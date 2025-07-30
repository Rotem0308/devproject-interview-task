import React from "react";
import SearchInput from "./SearchInput";
import TaskList from "./TaskList";
import SortDropdown from "./SortDropdown";
import { SORT_OPTIONS } from "@/consts/sortOptions";
import { LabelValueOrder } from "@/types/label-value-order";

const TaskBoard = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // const [searchText, setSearchText] = useState<string>("");
  // const [sortOption, setSortOption] = useState<LabelValueOrder>();
  console.log(searchParams);
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
        <SortDropdown options={SORT_OPTIONS} />
        <SearchInput />
      </div>
      <TaskList searchParams={searchParams} />
    </section>
  );
};

export default TaskBoard;
