import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useAppSelector } from "../../redux/hooks";
import { IoIosSearch } from "react-icons/io";
import NavProfile from "./nav/NavProfile";
import { IoIosArrowUp } from "react-icons/io";
const Navbar: React.FC = () => {
  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const toggleNavDrawer = () => {
    setIsOpenNavDrawer(!isOpenNavDrawer);
  };

  return (
    <>
      <nav className="flex py-2 bg-white  fixed z-30 top-0 left-0 w-full bg-pure  shadow-lg  justify-between px-5 items-center">
        <div>
          <NavLink to={"/"} className={"text-2xl font-bold"}>
            Blog<span className="text-blue-800 ">Haven</span>
          </NavLink>{" "}
        </div>

        <div className=" hidden lg:flex gap-5 ">
          <ul className="flex text-xl items-center gap-5 text-md font-medium mr-10">
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
            <li>
              {" "}
              <div className="flex items-center gap-5 ">
                <NavLink to="/blogs">
                  <IoIosSearch
                    // onClick={toggleSearchBar}
                    className="text-3xl cursor-pointer "
                  />
                </NavLink>

                <div>
                  <IoMenu
                    onClick={toggleNavDrawer}
                    className="  lg:hidden text-heading dark:text-pure h-6 w-6"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-5 items-center">
                {userInfo ? (
                  <div className="flex justify-center items-center">
                    <NavProfile isOpen={isOpen} setIsOpen={setIsOpen} />
                    <button>
                      <IoIosArrowUp
                        onClick={() => setIsOpen(!isOpen)}
                        className={`transition duration-300 cursor-pointer ml-4 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-5 items-center">
                    <NavLink
                      className="text-gray-950 font-medium"
                      to={"/login"}
                    >
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
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5 lg:hidden ">
          <NavLink to="/blogs">
            <IoIosSearch
              // onClick={toggleSearchBar}
              className=" text-3xl cursor-pointer "
            />
          </NavLink>
          {userInfo ? (
            <div className="flex justify-center items-center">
              <NavProfile isOpen={isOpen} setIsOpen={setIsOpen} />
              <button>
                <IoIosArrowUp
                  onClick={() => setIsOpen(!isOpen)}
                  className={`transition duration-300 cursor-pointer ml-4 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          ) : (
            ""
          )}
          <div>
            <IoMenu
              onClick={toggleNavDrawer}
              className="   text-heading dark:text-pure h-6 w-6"
            />
          </div>
        </div>
        {/* <div className="flex items-center gap-5 ">
          <NavLink to="/blogs">
            <IoIosSearch
              // onClick={toggleSearchBar}
              className="text-3xl cursor-pointer "
            />
          </NavLink>

          <div>
            <IoMenu
              onClick={toggleNavDrawer}
              className="  lg:hidden text-heading dark:text-pure h-6 w-6"
            />
          </div>
        </div> */}
      </nav>

      <div
        className={` w-[70%] md:w-[30%]  from-startColor to-endColor dark:bg-gradient-to-r  text-heading dark:text-pure  fixed top-0 right-0 py-4  px-3 bg-white shadow-lg transition-transform duration-300 h-screen z-50
          ${isOpenNavDrawer ? "translate-x-0 " : " translate-x-full"}
          `}
      >
        <div className="flex justify-end">
          <IoCloseSharp onClick={toggleNavDrawer} className="h-6 w-6 " />
        </div>
        <ul className="flex gap-5 text-md flex-col font-medium mr-10">
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
          <li>
            {userInfo ? (
              ""
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
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
