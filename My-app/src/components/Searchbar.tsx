import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search Products ..."
          value={value}
          onChange={handleChange}
          className="border font-semibold border-gray-300 rounded-xl bg-white text-[#105800] hover:bg-gray-50 text-xl mx-5 p-1 "
        />
      </div>
    </>
  );
}
