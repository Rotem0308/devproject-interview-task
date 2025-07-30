import React from "react";

const Footer = () => {
  const curretDate = new Date();
  return (
    <div className="p-4 bg-gray-500 text-white text-1xl flex justify-center items-center">
      {curretDate.toDateString()}
    </div>
  );
};

export default Footer;
