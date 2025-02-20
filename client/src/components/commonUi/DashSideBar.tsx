import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaBlogger, FaBookmark, FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLogOutMutation } from "../../redux/auth/authApi";
import { logout } from "../../redux/auth/authSlice";
interface toggleSideBarProps {
  toggleSideBar: () => void;
}

const DashSideBar: React.FC<toggleSideBarProps> = ({ toggleSideBar }) => {
  const dispatch = useAppDispatch();
  const [logOut, {}] = useLogOutMutation();
  const handleLogout = async () => {
    dispatch(logout());
    await logOut(null).unwrap();
  };

  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-5 h-screen px-2 ">
      <div className="flex mb-5 justify-end text-2xl">
        <RxCross2 className="lg:hidden " onClick={toggleSideBar} />
      </div>
      <div>
        <Link
          to="?tab=profile"
          className="flex cursor-pointer gap-3 items-center"
        >
          <FaUser />
          Profile
        </Link>
      </div>
      <div>
        <Link
          to="?tab=saved-blogs"
          className="flex gap-3 cursor-pointer items-center"
        >
          <FaBookmark /> Saved Blogs
        </Link>
      </div>
      {userInfo?.role === "author" && (
        <div>
          <div>
            <Link
              to="?tab=blog-list"
              className="flex gap-3 cursor-pointer font-medium items-center"
            >
              <FaBlogger className="text-2xl" /> My Blog
            </Link>
          </div>
          <div className="mt-5">
            <Link
              to="?tab=add-blog"
              className="flex gap-3 cursor-pointer font-medium items-center"
            >
              <FaBlogger className="text-2xl" /> Add Blog
            </Link>
          </div>
        </div>
      )}

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

export default DashSideBar;
