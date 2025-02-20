import React from "react";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../redux/blog/blogApi";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../redux/api";
type CustomErrorData = {
  message: string;
};

type Author = {
  _id: string;
  name: string;
  id: string;
};

type Category = {
  _id: string;
  categoryName: string;
};

type Blog = {
  _id: string;
  author: Author;
  category: Category;
  title: string;
  content: string;
  thumbnailImage: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
  likes: string[];
};
const AdminBlogs: React.FC = () => {
  const {
    data,
    isLoading,
    refetch,
    // isSuccess: blogIsSuccess,
    isError,
    error,
  } = useGetBlogsQuery(0);

  const [deleteBlog, { isLoading: deleteIsLoading, isSuccess }] =
    useDeleteBlogMutation();
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
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
  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      refetch();
    } catch (error) {}
  };
  if (isSuccess) toast.success("Blog Deleted Successfully");
  return (
    <div className="px-5">
      {data?.blogs?.length === 0 ? (
        <p className="text-2xl">No Blogs Found</p>
      ) : (
        <>
          <h2 className=" bg-blue-600 rounded text-center text-2xl py-1  text-white  my-4">
            Blogs:
          </h2>
          <div className="md:grid md:grid-cols-2  xl:grid-cols-3 gap-5  ">
            {data.blogs.map((blog: Blog) => {
              const content = blog.content.substring(0, 200);
              const title = blog.title.substring(0, 25);
              return (
                <div key={blog?._id} className="">
                  <div className="">
                    <img
                      className="md:h-[55vh] w-full"
                      src={
                        blog?.thumbnailImage
                          ? `${BASE_URL}/thumbnail/${blog?.thumbnailImage}`
                          : ""
                      }
                      alt={blog.tags[0]}
                    />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">
                      {dayjs(blog.createdAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div>
                    <h2 className="md:text-2xl text-blue-950 font-bold ">
                      {title}...
                    </h2>
                    <p className=" text-slate-500  md:text-md">{content}...</p>
                  </div>
                  <div className="my-6">
                    <Link
                      to={`/admin-dashboard/update-blog/${blog?._id}`}
                      className="bg-blue-600 px-7 py-1 text-xl text-white rounded"
                    >
                      Edit
                    </Link>

                    <button
                      disabled={deleteIsLoading}
                      onClick={() => handleDeleteBlog(blog?._id)}
                      className={`ml-8 px-7 py-1 text-xl text-white rounded ${
                        isLoading ? "bg-red-900 " : "bg-red-600 "
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBlogs;
