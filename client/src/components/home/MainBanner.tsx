import React from "react";
import { useGetAllBlogByCategoryQuery } from "../../redux/home/homeApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../redux/api";

type Author = {
  _id: string;
  name: string;
  id: string;
};

type Blog = {
  _id: string;
  author: Author;
  category: string;
  title: string;
  content: string;
  thumbnailImage: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
  likes: string[];
};

const MainBanner: React.FC = () => {
  const { data, isLoading, isError, error } =
    useGetAllBlogByCategoryQuery("finance");
  // console.log(data);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (isError) {
    return (
      <div>
        {
          (error as FetchBaseQueryError & { data: { message: string } }).data
            ?.message
        }
      </div>
    );
  }
  return (
    <section className="">
      {data?.blogs?.slice(0, 1)?.map((blog: Blog) => {
        const content = blog.content.substring(0, 400);
        return (
          <div key={blog._id}>
            <div className="">
              <img
                className="w-full md:h-[58vh] "
                src={
                  blog?.thumbnailImage
                    ? `${BASE_URL}/thumbnail/${blog?.thumbnailImage}`
                    : ""
                }
                alt={blog.tags[0]}
              />
            </div>
            <div>
              <h2 className="md:text-2xl text-blue-950 font-bold ">
                {blog?.title}
              </h2>
              <p className=" text-slate-500 md:text-md">{content}...</p>
            </div>
            <div className="flex  gap-10">
              <p className="text-slate-500 font-medium">
                {dayjs(blog.createdAt).format("MMMM D, YYYY")}
              </p>{" "}
              <NavLink
                className={
                  "text-blue-900 font-medium border-b-2 border-blue-900 hover:pb-1 transition-all delay-300 ease"
                }
                to={`/blog-details/${blog?._id}`}
              >
                Read More
              </NavLink>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MainBanner;
