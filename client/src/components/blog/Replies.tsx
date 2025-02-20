import React from "react";
import { format } from "timeago.js";
import { BASE_URL } from "../../redux/api";

type Replies = {
  _id: string;
  reply: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: Date;
};

type RepliesProps = {
  replies: Replies[];
};

const Replies: React.FC<RepliesProps> = ({ replies }) => {
  return (
    <section className="mt-4 ">
      <div className="space-y-4">
        {replies.map((reply) => (
          <div
            key={reply._id}
            className="p-3 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex gap-3 items-center mb-2">
              <img
                src={`${BASE_URL}/users/${reply?.user?.photo}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full bg-gray-300"
              />
              <h4 className="capitalize font-medium text-gray-800">
                {reply?.user?.name}
              </h4>
            </div>
            <p className="text-gray-700">{reply?.reply}</p>
            <p className="text-sm text-gray-500">{format(reply?.createdAt)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Replies;
