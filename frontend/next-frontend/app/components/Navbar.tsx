import { Turtle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="p-4 h-50px flex justify-between">
      <div className="flex gap-4 text-2xl font-bold items-center font-mono select-none">
        <Turtle color="lightgreen" size={34} />
        <p>Turtask</p>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href={"/"}
          className="outline-1 p-2 rounded-md hover:bg-orange-300 hover:outline-0 transition-all duration-100"
        >
          Home
        </Link>
        <Link
          href={"/tasks/create"}
          className="outline-1 p-2 rounded-md hover:bg-orange-300 hover:outline-0 transition-all duration-100"
        >
          New
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
