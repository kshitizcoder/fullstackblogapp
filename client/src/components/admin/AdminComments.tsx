import React from "react";
import { useGetALLCommentsQuery } from "../../redux/comment/commentApi";
import dayjs from "dayjs";
import { BASE_URL } from "../../redux/api";
interface User {
  _id: string;
  name: string;
  photo: string;
  id: string;
}

interface Reply {
  _id: string;
  reply: string;
  user: string;
  id: string;
}

interface Comment {
  _id: string;
  comment: string;
  user: User;
  blog: string;
  createdAt: string;
  __v: number;
  replies: Reply[];
  id: string;
}

const AdminComments: React.FC = () => {
  const { data } = useGetALLCommentsQuery(0);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Comments & Replies{" "}
      </h2>
      <div className="space-y-6">
        {data?.comments?.map((comment: Comment) => (
          <div
            key={comment._id}
            className="p-5 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex items-start space-x-4">
              <img
                // src={comment.user.photo}
                src={`${BASE_URL}/users/${comment?.user?.photo}`}
                alt={comment.user.name}
                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {comment.user.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {dayjs(comment.createdAt).format("MMMM D, YYYY")}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{comment.comment}</p>
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-md font-semibold text-gray-800">
                      Replies:
                    </h4>
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="pl-6 border-l-2 border-gray-300"
                      >
                        <p className="text-gray-600 text-sm">{reply.reply}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComments;
