"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SearchProps {
  placeholder?: string;
  className?: string;
}
const SearchInput = ({ placeholder, className }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams();
    params.set("searchText", value);

    router.push(`?${params.toString()}`);
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
