import React, { FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useSearchParams } from "react-router-dom";
interface SearchBarProps {
  toggleSearchBar: () => void;
}
const SearchBox: React.FC<SearchBarProps> = ({ toggleSearchBar }) => {
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    searchParams.set("search", search);
    setSearchParams(searchParams);
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className=" flex   w-full px-5  py-1  bg-white">
      <form
        onSubmit={handleSubmit}
        action=""
        className=" border flex justify-between border-gray-500 rounded-2xl px-5 mx-auto py-1 w-1/2"
      >
        <input
          type="text"
          value={search}
          className="focus:outline-none w-full"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <IoIosSearch className="text-3xl" />
        </button>
      </form>
      <div className="flex justify-items-start">
        <button
          className="cursor-pointer border border-gray-500 p-2 rounded-md"
          onClick={toggleSearchBar}
        >
          <RxCross2 className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
