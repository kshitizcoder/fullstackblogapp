import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { IoIosSearch } from "react-icons/io";
import NavProfile from "./NavProfile";

const DesktopNav: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex px-10 py-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {" "}
            <NavLink to={"/"}>
              Blog<span className="text-blue-800 ">Haven</span>
            </NavLink>{" "}
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <ul className="flex gap-5 text-md font-medium mr-10">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/"}
              >
                Home
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/blog/finance"}
              >
                Finance
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/blog/technology"}
              >
                Technology
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/blog/gaming"}
              >
                Gaming
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/blog/lifeStyle"}
              >
                LifeStyle
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5 ">
          <NavLink to="/blogs">
            <IoIosSearch
              onClick={toggleSearchBar}
              className="text-3xl cursor-pointer "
            />
          </NavLink>
          {userInfo ? (
            <NavProfile />
          ) : (
            <div className="flex gap-5 items-center">
              <NavLink className="text-gray-950 font-medium" to={"/login"}>
                login
              </NavLink>
              <NavLink
                className="bg-blue-600 px-7 rounded  text-white py-1"
                to={"/signup"}
              >
                SignUp
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
