import React, { FormEvent, useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/category/categoryApi";

import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

type Category = {
  _id: string;
  categoryName: string;
};

type CustomErrorData = {
  message: string;
};

/// 3:50:00

const FilterBox: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<{
    category: string;
    search: string;
    sortBy: string;
  }>({
    category: "",
    search: "",
    sortBy: "",
  });
  const updateUrlParams = (newFilters: any) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      search: params.search || "",
      sortBy: params.sortBy || "",
    });
  }, [searchParams]);

  const { data, isError, isLoading, error } = useGetAllCategoriesQuery(0);
  if (isError) {
    if ("data" in error) {
      const errorData = error.data as CustomErrorData;
      toast.error(errorData.message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setQuery({ category, search, sortBy });
    updateUrlParams(filters);
  };

  return (
    <div className=" h-screen bg-white shadow-lg rounded-lg p-6 ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Search</label>
          <input
            value={filters.search}
            type="text"
            name="search"
            placeholder="Type to search..."
            onChange={handleFilterChange}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
            onChange={handleFilterChange}
          >
            <option value="">Select a category</option>
            {isLoading ? (
              <option disabled>Loading...</option>
            ) : (
              data?.categories?.map((category: Category) => (
                <option
                  key={category._id}
                  className="capitalize"
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Sort By</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            autoComplete="off"
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;
