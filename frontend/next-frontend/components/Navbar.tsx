import { Turtle } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="p-4 h-50px flex justify-between">
      <div className="flex gap-4 text-2xl font-bold items-center font-mono">
        <Turtle color="lightgreen" size={34} />
        <p>Turtask</p>
      </div>
    </div>
  );
};

export default Navbar;
