import React, { useEffect } from "react";
import dayjs from "dayjs";
import {
  useDeleteBlogMutation,
  useGetBLogsByAuthorQuery,
} from "../../redux/blog/blogApi";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllSavedBlogsQuery } from "../../redux/savedBlog/savedBlogApi";
import { useAppSelector } from "../../redux/hooks";
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

const BlogsList: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { data, isError, isLoading, error, refetch } =
    useGetBLogsByAuthorQuery(0);
  const { refetch: savedBlogRefetch } = useGetAllSavedBlogsQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });

  const [deleteBlog, { isLoading: deleteIsLoading, isSuccess }] =
    useDeleteBlogMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Blog Deleted Successfully");
  }, [isSuccess]);

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      refetch();
      savedBlogRefetch();
    } catch (error) {
      // Handle error if necessary
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

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

  return (
    <section className="md:px-5">
      {data?.blogs?.length === 0 ? (
        <p className="text-2xl">No Blogs Found</p>
      ) : (
        <>
          <h2 className=" bg-blue-600 rounded text-center text-2xl py-1  text-white  my-4">
            Blogs:
          </h2>
          <div className="md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {data.blogs.map((blog: Blog) => {
              const content = blog.content.substring(0, 200);
              const title = blog.title.substring(0, 25);
              return (
                <div key={blog?._id}>
                  <div>
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
                    <h2 className="md:text-2xl text-blue-950 font-bold">
                      {title}...
                    </h2>
                    <p className=" text-slate-500  md:text-md">{content}...</p>
                  </div>
                  <div className="my-6">
                    <Link
                      to={`/author-dashboard/update-blog/${blog?._id}`}
                      className="bg-blue-600 px-7 py-1 text-xl text-white rounded"
                    >
                      Edit
                    </Link>

                    <button
                      disabled={deleteIsLoading}
                      onClick={() => handleDeleteBlog(blog?._id)}
                      className={`ml-8 px-7 py-1 text-xl text-white rounded ${
                        deleteIsLoading ? "bg-red-900 " : "bg-red-600 "
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
    </section>
  );
};

export default BlogsList;

// import React, { useEffect } from "react";
// import dayjs from "dayjs";
// import {
//   useDeleteBlogMutation,
//   useGetBLogsByAuthorQuery,
// } from "../../redux/blog/blogApi";

// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useGetAllSavedBlogsQuery } from "../../redux/savedBlog/savedBlogApi";
// import { useAppSelector } from "../../redux/hooks";

// type CustomErrorData = {
//   message: string;
// };

// type Author = {
//   _id: string;
//   name: string;
//   id: string;
// };

// type Category = {
//   _id: string;
//   categoryName: string;
// };

// type Blog = {
//   _id: string;
//   author: Author;
//   category: Category;
//   title: string;
//   content: string;
//   thumbnailImage: string;
//   coverImage: string;
//   tags: string[];
//   createdAt: string;
//   likes: string[];
// };

// const BlogsList: React.FC = () => {
//   const { data, isError, isLoading, error, refetch } =
//     useGetBLogsByAuthorQuery(0);
//   const { userInfo } = useAppSelector((state) => state.auth);

//   const [deleteBlog, { isLoading: deleteIsLoading, isSuccess }] =
//     useDeleteBlogMutation();
//   const { refetch: savedBlogRefetch } = useGetAllSavedBlogsQuery(userInfo?.id, {
//     skip: !userInfo?.id,
//   });
//   if (isLoading) {
//     return <p className="text-center">Loading...</p>;
//   }
//   if (isError) {
//     if (isError) {
//       if ("data" in error) {
//         const errorData = error?.data as CustomErrorData;
//         return (
//           <p className="text-red-700 text-center font-medium capitalize">
//             {errorData?.message}
//           </p>
//         );
//       }
//     }
//   }
//   const handleDeleteBlog = async (id: string) => {
//     try {
//       await deleteBlog(id).unwrap();
//       refetch();
//       savedBlogRefetch();
//     } catch (error) {}
//   };
//   useEffect(() => {
//     if (isSuccess) toast.success("Blog Deleted Successfully");
//   }, [isSuccess]);

//   return (
//     <section className="md:px-5">
//       {data?.blogs?.length === 0 ? (
//         <p className="text-2xl">No Blogs Found</p>
//       ) : (
//         <>
//           <h2 className=" bg-blue-600 rounded text-center text-2xl py-1  text-white  my-4">
//             Blogs:
//           </h2>
//           <div className="md:grid md:grid-cols-2  xl:grid-cols-3 gap-5  ">
//             {data.blogs.map((blog: Blog) => {
//               const content = blog.content.substring(0, 200);
//               const title = blog.title.substring(0, 25);
//               return (
//                 <div key={blog?._id} className="">
//                   <div className="">
//                     <img
//                       className="md:h-[55vh] w-full"
//                       src={
//                         blog?.thumbnailImage
//                           ? `http://localhost:8000/thumbnail/${blog?.thumbnailImage}`
//                           : ""
//                       }
//                       alt={blog.tags[0]}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-slate-500 font-medium">
//                       {dayjs(blog.createdAt).format("MMMM D, YYYY")}
//                     </p>
//                   </div>
//                   <div>
//                     <h2 className="md:text-2xl text-blue-950 font-bold ">
//                       {title}...
//                     </h2>
//                     <p className=" text-slate-500  md:text-md">{content}...</p>
//                   </div>
//                   <div className="my-6">
//                     <Link
//                       to={`/author-dashboard/update-blog/${blog?._id}`}
//                       className="bg-blue-600 px-7 py-1 text-xl text-white rounded"
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       disabled={deleteIsLoading}
//                       onClick={() => handleDeleteBlog(blog?._id)}
//                       className={`ml-8 px-7 py-1 text-xl text-white rounded ${
//                         isLoading ? "bg-red-900 " : "bg-red-600 "
//                       }`}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default BlogsList;
