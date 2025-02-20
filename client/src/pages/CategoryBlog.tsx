import React from "react";
import dayjs from "dayjs";
import { NavLink, useParams } from "react-router-dom";
import numeral from "numeral";
import { useGetAllBlogByCategoryQuery } from "../redux/home/homeApi";
import { IoMdHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { useToggleLikeMutation } from "../redux/like/likeApi";
import toast from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import {
  useGetAllSavedBlogsQuery,
  useToggleSavedBlogMutation,
} from "../redux/savedBlog/savedBlogApi";
import { BASE_URL } from "../redux/api";
type Author = {
  _id: string;
  name: string;
  id: string;
};
// type CustomErrorData = {
//   message: string;
// };
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

type SavedBlog = {
  _id: string;
  user: string;
  createdAt: string;
  __v: number;
  blog: {
    _id: string;
    author: string;
    category: string;
    title: string;
    content: string;
    thumbnailImage: string;
    coverImage: string;
    tags: string[];
    createdAt: string;
  }[];
};
const CategoryBlog: React.FC = () => {
  const { catgeory } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError, error, refetch } =
    useGetAllBlogByCategoryQuery(catgeory);

  const { refetch: savedBlogRefetch } = useGetAllSavedBlogsQuery(0);
  const [toggleLike, { isError: likeIsError, error: likeError }] =
    useToggleLikeMutation();
  const [savedBlog] = useToggleSavedBlogMutation();
  const { data: savedBlogs } = useGetAllSavedBlogsQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });
  console.log(savedBlogs);

  const handleLike = async (id: string): Promise<void> => {
    try {
      await toggleLike({ blog: id }).unwrap();
      refetch();
    } catch (error) {
      toast.dismiss();
      if (likeIsError) {
        if (
          "data" in likeError &&
          likeError.data &&
          typeof likeError.data === "object"
        ) {
          toast.error(
            (likeError.data as { message?: string })?.message ||
              "An error occurred"
          );
        }
      }
    }
  };

  const handleSavedBlog = async (id: string) => {
    try {
      await savedBlog({ blog: id }).unwrap();
      savedBlogRefetch();
    } catch (error) {
      toast.error("Failed to save blog.");
    }
  };

  let errorMessage = "";
  if (isError && "data" in error) {
    errorMessage =
      (error.data as { message?: string })?.message || "An error occurred";
  }

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <section className="px-5 mt-17 h-screen ">
      {errorMessage && (
        <p className="text-red-700 text-center font-medium capitalize">
          {errorMessage}
        </p>
      )}

      <div>
        <p className="bg-blue-700 capitalize text-white font-medium text-center text-xl md:w-[50%] mx-auto">
          {data?.blogs?.length === 0
            ? `No ${catgeory} Blogs`
            : `${catgeory} Blogs`}
        </p>
      </div>

      <div className="md:grid mt-5 md:grid-cols-2 pb-10 lg:grid-cols-3 justify-items-center gap-10">
        {data?.blogs?.map((blog: Blog) => {
          const content = blog.content.substring(0, 300);
          const hasLiked = blog.likes.some((like) => like.like);
          const likeCount = blog.likes.length;
          const title = blog.title.substring(0, 30);
          const isBlogSaved = savedBlogs?.savedBlogs?.some((saved: SavedBlog) =>
            saved.blog.some((b) => b._id === blog._id)
          );
          return (
            <div key={blog._id}>
              <img
                className="h-[55vh] w-full"
                src={`${BASE_URL}/thumbnail/${blog.thumbnailImage}`}
                alt={blog.tags[0]}
              />

              <h2 className="md:text-2xl text-blue-950 font-bold">
                {title}...
              </h2>
              <p className="text-slate-500 md:text-md">{content}...</p>

              {userInfo && userInfo.role !== "admin" && (
                <div className="flex items-center justify-between my-3">
                  <div className="flex items-center gap-2">
                    <IoMdHeart
                      onClick={() => handleLike(blog._id)}
                      className={`${
                        hasLiked ? "text-blue-600" : "text-black"
                      } text-4xl`}
                    />
                    <p className="text-xl font-semibold">
                      {numeral(likeCount).format("0a")}
                    </p>
                  </div>
                  <FaBookmark
                    onClick={() => handleSavedBlog(blog._id)}
                    className={`text-2xl cursor-pointer ${
                      isBlogSaved ? "text-blue-600" : "text-black"
                    }`}
                  />
                </div>
              )}

              <div className="flex items-center mt-3 gap-10">
                <p className="text-slate-500 font-medium">
                  {dayjs(blog.createdAt).format("MMMM D, YYYY")}
                </p>
                <NavLink
                  className="text-blue-900 font-medium border-b-2 border-blue-900 hover:pb-1 transition-all delay-300 ease"
                  to={`/blog-details/${blog._id}`}
                >
                  Read More
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBlog;
