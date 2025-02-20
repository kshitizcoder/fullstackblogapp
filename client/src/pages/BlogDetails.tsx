import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../redux/blog/blogApi";
import DetailsBlog from "../components/blog/DetailsBlog";
import Comments from "../components/blog/Comments";
import AddComments from "../components/blog/AddComments";
import { useAppSelector } from "../redux/hooks";
type CustomErrorData = {
  message: string;
};
const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isError, error, isLoading } = useGetBlogByIdQuery(id);
  const { userInfo } = useAppSelector((state) => state.auth);
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

  return (
    <section className="pb-10  h-screen py-10">
      <DetailsBlog blog={data?.blog} />

      {userInfo ? (
        <div className="mx-auto w-[60%]  shadow-2xl  px-5">
          <div>
            <AddComments blogId={data?.blog?._id} />
          </div>
          <Comments blogId={data?.blog?._id} comments={data?.blog?.comments} />
        </div>
      ) : (
        <div className="mx-auto w-[60%] mt-5  shadow-2xl  px-5 py-10">
          <button className="bg-blue-700 text-xl px-5 py-1 rounded  text-white">
            Sign In To Comment{" "}
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
