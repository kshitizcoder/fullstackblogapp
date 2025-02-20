import React, { FormEvent, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useAddReplyMutation } from "../../redux/comment/replyApi";

import { useGetBlogByIdQuery } from "../../redux/blog/blogApi";
import { toast } from "react-toastify";

type AddRepliesProps = {
  commentId: string;
  blogId: string;
};

const AddReplies: React.FC<AddRepliesProps> = ({ commentId, blogId }) => {
  const [reply, setReply] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const [addReply, { isLoading, isError, error }] = useAddReplyMutation();
  const { refetch } = useGetBlogByIdQuery(blogId);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      await addReply({ comment: commentId, reply }).unwrap();
      refetch();
      setReply("");
    } catch (err) {
      if (isError) {
        if ("data" in error && error.data && typeof error.data === "object") {
          toast.error(
            (error.data as { message?: string })?.message || "An error occurred"
          );
        }
      }
    }
  };
  return (
    <section className=" ml-10 ">
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setReply(e.target.value)}
            type="text"
            value={reply}
            placeholder="Enter Reply"
            className="border w-full px-5 pt-1 pb-10 rounded-md focus:outline-none "
          />
          <div>
            <button
              disabled={isLoading}
              className={`${
                isLoading ? "bg-blue-500" : "bg-blue-700"
              } mt-5 px-5 py-1 co rounded text-white`}
            >
              {userInfo && userInfo.role !== "admin"
                ? " Add Reply"
                : "Sigin To Repy"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddReplies;
