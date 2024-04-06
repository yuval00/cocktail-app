import React, { useState } from 'react';

interface SearchTextboxProps {
  onSearch: (searchPrompt: string) => void;
}

const SearchTextbox: React.FC<SearchTextboxProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
    setSearchValue("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue !== "") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a drink"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-4 py-2 pr-10 rounded-full bg-gray-200 focus:bg-sky-100 focus:outline-sky-400 w-full"
        onSubmit={handleSearch}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
      >
        <img src="search.svg" alt="search icon" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchTextbox;
