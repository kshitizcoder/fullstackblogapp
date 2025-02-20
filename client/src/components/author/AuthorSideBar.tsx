import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaBlogger } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface toggleSideBarProps {
  toggleSideBar: () => void;
}
const AuthorSideBar: React.FC<toggleSideBarProps> = ({ toggleSideBar }) => {
  return (
    <div className="flex flex-col gap-5 h-screen px-2 ">
      <div className="flex mb-5 justify-end text-2xl">
        <RxCross2 className="lg:hidden " onClick={toggleSideBar} />
      </div>
      <div>
        <Link
          to="?tab=profile"
          className="flex cursor-pointer gap-3 font-medium items-center"
        >
          <FaUser className="text-2xl" />
          Profile
        </Link>
      </div>
      <div>
        <Link
          to="?tab=blog-list"
          className="flex gap-3 cursor-pointer font-medium items-center"
        >
          <FaBlogger className="text-2xl" /> Blog List
        </Link>
      </div>

      <div>
        <Link
          to={"?tab=change-password"}
          className="cursor-pointer gap-3 font-medium flex items-center rounded"
        >
          <MdPassword className="w-6 h-6" />
          ChangePassword
        </Link>
      </div>
      <div>
        <button className="cursor-pointer bg-red-600 gap-4 flex items-center text-white px-5 py-1 rounded">
          <CiLogout className="text-2xl" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AuthorSideBar;
