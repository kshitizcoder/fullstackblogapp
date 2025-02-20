import React, { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useAddCommentMutation } from "../../redux/comment/commentApi";

import { useGetBlogByIdQuery } from "../../redux/blog/blogApi";
import { toast } from "react-toastify";

type AddCommentProps = {
  blogId: string;
};
const AddComments: React.FC<AddCommentProps> = ({ blogId }) => {
  const [comment, setComment] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const [addComment, { error, isError, isLoading, isSuccess }] =
    useAddCommentMutation();
  const { refetch } = useGetBlogByIdQuery(blogId);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment added successfully!");
    }
  }, [isSuccess]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await addComment({ blog: blogId, comment }).unwrap();
    setComment("");
    refetch();
  };

  if (isError) {
    if ("data" in error && error.data && typeof error.data === "object") {
      toast.error(
        (error.data as { message?: string })?.message || "An error occurred"
      );
    }
  }
  return (
    <section className=" ">
      <h4 className="text-2xl font-medium my-3">Comments</h4>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            value={comment}
            placeholder="Enter Comment"
            className="border w-full px-5 pt-1 pb-10 rounded-md focus:outline-none "
          />
          <div>
            {}
            <button
              disabled={isLoading}
              className="bg-blue-700 mt-5 px-5 py-1 co rounded text-white"
            >
              {userInfo ? " Add Comment" : "Sigin To Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddComments;
