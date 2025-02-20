import React, { useEffect } from "react";
import {
  useGetAllSavedBlogsQuery,
  useToggleSavedBlogMutation,
} from "../../redux/savedBlog/savedBlogApi";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hooks";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import { BASE_URL } from "../../redux/api";
export interface Blog {
  _id: string;
  author: string;
  category: string;
  title: string;
  content: string;
  thumbnailImage: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
}

export interface SavedBlog {
  _id: string;
  blog: Blog[];
  user: string;
  createdAt: string;
}

export interface GetSavedBlogsResponse {
  status: string;
  savedBlogs: SavedBlog[];
}

const SavedBlogs: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { data, refetch } = useGetAllSavedBlogsQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });
  const [savedBlog, { isSuccess }] = useToggleSavedBlogMutation();
  const handleSavedBlog = async (id: string) => {
    try {
      await savedBlog({ blog: id }).unwrap();
      refetch();
    } catch (error) {
      toast.error("Failed to save blog.");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog Unsaved SuccessFul");
    }
  }, [isSuccess]);
  return (
    <div className="px-5 mt-6">
      {data?.savedBlogs?.length === 0 ? (
        <div className="mt-6">
          <h2 className="text-2xl ">No Saved Blogs Found</h2>
        </div>
      ) : (
        <div className=" px-5 grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.savedBlogs.map((savedBlog: SavedBlog) =>
            savedBlog?.blog?.map((blog) => {
              const content = blog.content.substring(0, 200);
              const title = blog.title.substring(0, 32);
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
                      {blog?.title?.length > 32 ? `${title}..` : blog?.title}
                    </h2>
                    <p className=" text-slate-500  md:text-md">{content}...</p>
                  </div>
                  <div>
                    {" "}
                    <div className="text-blue-600 mt-5 flex justify-end w-full">
                      <FaBookmark
                        onClick={() => handleSavedBlog(blog._id)}
                        className="text-3xl mr-4"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;
