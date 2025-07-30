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
      <Link href={"/"}>Home</Link>
    </div>
  );
};

export default Navbar;
