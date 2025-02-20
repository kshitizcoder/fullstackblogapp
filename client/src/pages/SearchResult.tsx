import React, { useEffect, useRef, useState } from "react";
import FilterBox from "../components/SearchResult/FilterBox";
import { useGetBlogsQuery } from "../redux/blog/blogApi";
import BlogsResult from "../components/SearchResult/BlogsResult";
import { useSearchParams } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data, isError, error } = useGetBlogsQuery(searchParams.toString());
  if (isError) {
    console.log(error);
  }
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <section className=" px-5  mt-15 ">
      <h2 className="text-center my-2 py-1 rounded-md text-2xl font-medium bg-blue-600 text-white">
        Blog Posts
      </h2>
      <div className="flex flex-col items-center lg:flex-row lg:items-start  gap-10 ">
        <div
          ref={sidebarRef}
          className={` ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed z-50 w-64 top-0 left-0 inset-y-0 transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <FilterBox />
        </div>
        <div className="lg:hidden">
          <button onClick={toggleFilter} className="flex items-center text-2xl">
            <MdFilterAlt /> Filter
          </button>
        </div>
        <div className="flex">
          {data?.blogs?.length > 0 ? (
            <BlogsResult blogs={data?.blogs} />
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
