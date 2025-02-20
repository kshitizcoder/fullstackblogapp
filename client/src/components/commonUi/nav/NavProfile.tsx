import React from "react";
import { useProfileQuery } from "../../../redux/auth/userApi";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLogOutMutation } from "../../../redux/auth/authApi";
import { logout } from "../../../redux/auth/authSlice";
import { BASE_URL } from "../../../redux/api";

interface NavProfileProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavProfile: React.FC<NavProfileProps> = ({ setIsOpen, isOpen }) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data, refetch } = useProfileQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });
  const dispatch = useAppDispatch();
  const [logOut, {}] = useLogOutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    await logOut(null).unwrap();
  };

  const navigateUserToDashboard = () => {
    console.log("clicked");
    if (userInfo?.role === "user") {
      console.log("clicked");
      return navigate("/user-dashboard?tab=profile");
    } else if (userInfo?.role === "author") {
      navigate("/author-dashboard?tab=profile");
    } else if (userInfo?.role === "admin") {
      navigate("/admin-dashboard");
    }
  };
  return (
    <div className="relative flex flex-col items-center">
      <img
        onClick={() => setIsOpen(!isOpen)}
        src={`${BASE_URL}/users/${data?.user?.photo}`}
        alt={data?.user?.role}
        className="w-10 rounded-full border-2 border-gray-300"
      />
      <div
        className={`absolute -right-7 bottom-[-10rem] border border-gray-300 rounded-2xl shadow-[0_20px_50px_rgba(169,_169,_169,_0.9)] px-5 py-4 z-60 flex flex-col gap-4 bg-white h-40 w-60 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <button
          onClick={navigateUserToDashboard}
          className="text-2xl flex cursor-pointer  items-center gap-3 text-gray-800"
        >
          <FaUser /> DashBoard
        </button>
        <button
          onClick={handleLogout}
          className="flex justify-center ite 
        bg-red-600 text-white rounded px-5 gap-2 py-1 items-center"
        >
          <CiLogout className="" /> Logout
        </button>
      </div>
    </div>
  );
};

export default NavProfile;
