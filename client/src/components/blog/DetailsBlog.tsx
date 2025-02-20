import React from "react";
import { BASE_URL } from "../../redux/api";

type Blog = {
  id: string;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    categoryName: string;
  };
  comments: any[];
  content: string;
  coverImage: string;
  createdAt: string;
  likes: any[];
  tags: string[];
  thumbnailImage: string;
  title: string;
};
type DetailsBlogProps = {
  blog: Blog;
};
const DetailsBlog: React.FC<DetailsBlogProps> = ({ blog }) => {
  return (
    <section>
      <div className="mx-auto w-[60%] bg-white py-10 shadow-md rounded-lg px-7">
        <div>
          <img
            className="h-[67vh] w-full"
            src={`${BASE_URL}/cover/${blog?.coverImage}`}
            alt=""
          />
        </div>
        <h2 className="border rounded-lg my-4  text-blue-950 px-3 text-2xl font-bold w-[95%] py-2">
          {blog?.title}
        </h2>

        <p className="text-slate-600 border w-[95%]  rounded-lg py-5 px-3">
          {blog?.content}
        </p>
        <div className="mt-4 ">
          <h4 className="text-2xl font-medium"> Tags:</h4>
          <div className="flex gap-8 mt-3 ">
            {blog?.tags?.map((tag: string, i: number) => {
              return (
                <div key={i} className="">
                  <p className="bg-blue-700 rounded-2xl text-white px-5 py-1 ">
                    {tag}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsBlog;
