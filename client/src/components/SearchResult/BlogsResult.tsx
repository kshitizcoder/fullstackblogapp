// BlogsResult Component
import React from "react";
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
  likes: Like[];
};

type Like = {
  like: boolean;
  _id: string;
};
interface BlogsResultProps {
  blogs: Blog[];
}

const BlogsResult: React.FC<BlogsResultProps> = ({ blogs }) => {
  return (
    <div className="w-full md:w-full  lg:w-[75vw]">
      <div className="grid grid-cols-1 py-7 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: Blog) => {
          const content = blog.content.substring(0, 200);
          const title = blog.title.substring(0, 30);
          return (
            <div key={blog?._id} className="bg-white shadow-md py-6 rounded-lg">
              <div>
                <img
                  className="md:h-[55vh] w-full object-cover"
                  src={
                    blog?.thumbnailImage
                      ? `${BASE_URL}/thumbnail/${blog?.thumbnailImage}`
                      : ""
                  }
                  alt={blog.tags[0]}
                />
              </div>
              <div className="p-4">
                <p className="text-slate-500 font-medium">
                  {dayjs(blog.createdAt).format("MMMM D, YYYY")}
                </p>
                <h2 className="text-xl font-semibold text-blue-950">
                  {blog?.title?.length > 34 ? `${title}...` : blog?.title}
                </h2>
                <p className="text-slate-500 md:text-md">{content}...</p>
              </div>
              <NavLink
                className={
                  "text-blue-900 m-5 font-medium border-b-2 border-blue-900 hover:pb-1 transition-all delay-300 ease"
                }
                to={`/blog-details/${blog._id}`}
              >
                Read More
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsResult;
