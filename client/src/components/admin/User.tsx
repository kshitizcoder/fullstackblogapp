import React from "react";
import { useGetALLUsersQuery } from "../../redux/auth/userApi";
import { BASE_URL } from "../../redux/api";
type Users = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "author" | "admin";
  __v: number;
  photo?: string;
  passwordChangeAt?: string;
  id: string;
};

const User: React.FC = () => {
  const { data } = useGetALLUsersQuery(0);
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-6 py-3 border-b border-gray-300">Sn</th>
            <th className="px-6 py-3 border-b border-gray-300">Name</th>
            <th className="px-6 py-3 border-b border-gray-300">Email</th>
            <th className="px-6 py-3 border-b border-gray-300">Photo</th>
            <th className="px-6 py-3 border-b border-gray-300">Role</th>
            <th className="px-6 py-3 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {data?.users.map((user: Users, i: number) => (
            <tr key={user?.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3 border-b border-gray-300">{i + 1}</td>
              <td className="px-6 py-3 border-b border-gray-300 capitalize">
                {user?.name}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
                {user?.email}
              </td>
              <td className="px-6 py-3 border-b border-gray-300 capitalize">
                <img
                  src={`${BASE_URL}/users/${user?.photo}`}
                  alt={user?.role}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                />
              </td>
              <td className="px-6 py-3 border-b border-gray-300 capitalize">
                {user?.role}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
                <div className="flex gap-3">
                  {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition">
                    Edit
                  </button> */}
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
