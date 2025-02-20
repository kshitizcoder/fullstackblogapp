import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLogOutMutation } from "../../redux/auth/authApi";
import { logout } from "../../redux/auth/authSlice";
import { RxCross2 } from "react-icons/rx";
import { FaBlogger, FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaComments } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdAnalytics } from "react-icons/io";
interface toggleSideBarProps {
  toggleSideBar: () => void;
}
const AdminSideBar: React.FC<toggleSideBarProps> = ({ toggleSideBar }) => {
  const dispatch = useAppDispatch();
  const [logOut, {}] = useLogOutMutation();
  const handleLogout = async () => {
    dispatch(logout());
    await logOut(null).unwrap();
  };

  return (
    <div className="flex flex-col gap-5 h-screen px-2 ">
      <div className="flex mb-5 justify-end text-2xl">
        <RxCross2 className="lg:hidden " onClick={toggleSideBar} />
      </div>
      <div>
        <Link
          to="?tab=analytics"
          className="flex cursor-pointer gap-3 items-center"
        >
          <IoMdAnalytics className="text-2xl" />
          Analytics
        </Link>
      </div>
      <div>
        <Link
          to="?tab=profile"
          className="flex cursor-pointer gap-3 items-center"
        >
          <FaUser className="text-2xl" />
          Profile
        </Link>
      </div>
      <div className="">
        <Link
          to="?tab=add-blog"
          className="flex gap-3 cursor-pointer font-medium items-center"
        >
          <FaBlogger className="text-2xl" /> Add Blog
        </Link>
      </div>
      <div>
        <Link
          to="?tab=all-blogs"
          className="flex gap-3 cursor-pointer font-medium items-center"
        >
          <FaBlogger className="text-2xl" /> All Blogs
        </Link>
      </div>{" "}
      <div>
        <Link
          to="?tab=all-users"
          className="flex gap-3 cursor-pointer font-medium items-center"
        >
          <HiMiniUsers className="text-2xl" /> All Users
        </Link>
      </div>{" "}
      <div>
        <Link
          to="?tab=all-comments"
          className="flex gap-3 cursor-pointer font-medium items-center"
        >
          <FaComments className="text-2xl" /> Comments & Replies
        </Link>
      </div>
      <div>
        <NavLink
          to={"?tab=change-password"}
          className="cursor-pointer gap-4 flex items-center  rounded"
        >
          <MdPassword className="text-2xl" />
          ChangePassword
        </NavLink>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="cursor-pointer bg-red-600 gap-4 flex items-center text-white px-5 py-1 rounded"
        >
          <CiLogout className="text-2xl" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
