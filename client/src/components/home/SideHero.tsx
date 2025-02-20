import React from "react";
import { useGetAllBlogByCategoryQuery } from "../../redux/home/homeApi";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { BASE_URL } from "../../redux/api";
type Author = {
  _id: string;
  name: string;
  id: string;
};
type CustomErrorData = {
  message: string;
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

const SideHero: React.FC = () => {
  const { data, isError, isLoading, error } =
    useGetAllBlogByCategoryQuery("technology");

  if (isLoading) {
    return <p className="text-xl">Loading...</p>;
  }
  if (isError) {
    if (isError) {
      if ("data" in error) {
        const errorData = error?.data as CustomErrorData;
        return (
          <p className="text-red-700 text-center font-medium capitalize">
            {errorData?.message}
          </p>
        );
      }
    }
  }
  return (
    <section className="flex flex-col gap-2">
      {data?.blogs?.slice(0, 4)?.map((blog: Blog) => {
        const content = blog.content.substring(0, 100);
        return (
          <div className="md:flex gap-5" key={blog._id}>
            <div className="">
              <img
                className="md:w-[20vw] md:h-[20vh] object-cover "
                src={
                  blog?.thumbnailImage
                    ? `${BASE_URL}/thumbnail/${blog?.thumbnailImage}`
                    : ""
                }
                alt={blog.tags[0]}
              />
            </div>
            <div>
              <h2 className="text-xl text-blue-950 font-bold w-[80%] ">
                {blog?.title}
              </h2>
              <p className=" text-slate-500 w-[80%]">{content}...</p>
              <div className="flex  gap-10">
                <p className="text-slate-500 font-medium">
                  {dayjs(blog.createdAt).format("MMMM D, YYYY")}
                </p>{" "}
                <NavLink
                  className={
                    "text-blue-900 font-medium border-b-2 border-blue-900 hover:pb-1 transition-all delay-300 ease"
                  }
                  to={`blog-details/${blog._id}`}
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SideHero;
