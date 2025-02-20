import React, { useState } from "react";
import { format } from "timeago.js";
import Replies from "./Replies";
import AddReplies from "./AddReplies";
import { BASE_URL } from "../../redux/api";

type RepliesProp = {
  createdAt: Date;
  _id: string;
  reply: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
};
type Comment = {
  _id: string;
  comment: string;
  user: {
    id: string;
    name: string;
    _id: string;
    photo: string;
  };
  blog: string;
  createdAt: Date;
  replies: RepliesProp[];
};

type CommentProps = {
  comments: Comment[];
  blogId: string;
};

const Comments: React.FC<CommentProps> = ({ comments, blogId }) => {
  const [seeMore, setSeeMore] = useState<string | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState<string | null>(null);

  return (
    <section className="py-10 max-w-2xl mx-auto">
      <div className="space-y-6">
        {comments?.map((comment) => {
          const isRepliesOpen = isReplyOpen === comment._id;
          const isExpanded = seeMore === comment._id;
          const shouldShowSeeMore = comment.comment.length > 200;
          const commentText = isExpanded
            ? comment.comment
            : `${comment.comment.substring(0, 200)}`;

          return (
            <div
              key={comment._id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`${BASE_URL}/users/${comment?.user?.photo}`}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold capitalize text-gray-800">
                    {comment?.user?.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {format(comment?.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{commentText}</p>
              {shouldShowSeeMore && (
                <button
                  onClick={() => setSeeMore(isExpanded ? null : comment._id)}
                  className="text-blue-600 font-medium hover:underline mt-1"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
              {/* Add Reply Section */}
              <div className="mt-4">
                <AddReplies blogId={blogId} commentId={comment._id} />
              </div>
              {/* Replies Section with Tailwind Animation */}
              {comment?.replies?.length > 0 && (
                <div className="mt-4 ml-10">
                  <button
                    onClick={() =>
                      setIsReplyOpen(isRepliesOpen ? null : comment._id)
                    }
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {isRepliesOpen
                      ? "Hide Replies"
                      : `${
                          comment.replies.length === 1
                            ? `1 Reply`
                            : `${comment.replies.length} Replies`
                        }`}
                  </button>

                  {/* Animated Replies Section */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isRepliesOpen
                        ? "max-h-[100vh] opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <Replies replies={comment?.replies} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comments;
