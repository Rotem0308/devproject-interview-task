"use client";
import React, { useState } from "react";

interface SearchProps {
  onSearch: Function;
  placeholder?: string;
  className?: string;
}
const SearchInput = ({ onSearch, placeholder, className }: SearchProps) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };
  return (
    <>
      <input
        type="text"
        className={className || "search-input"}
        placeholder={placeholder || "Search..."}
        onChange={handleInput}
      />
    </>
  );
};

export default SearchInput;
