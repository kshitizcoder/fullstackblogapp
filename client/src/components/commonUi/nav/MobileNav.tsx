import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg">
      <div className="flex justify-between items-center px-7 ">
        <div>
          <h1 className="text-2xl text-">BlogHaven </h1>
        </div>
        {isOpen ? (
          <RxCross2 className="text-2xl" onClick={() => setIsOpen(false)} />
        ) : (
          <IoIosMenu
            onClick={() => {
              setIsOpen(true);
              console.log("clicked");
            }}
            className="text-2xl"
          />
        )}
      </div>
      <div
        className={`absolute right-0 top-[3rem] w-[15rem] px-5 flex justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300 ease-in-out transform  ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0 py-5"
            : "max-h-0 opacity-0 -translate-y-full"
        } overflow-hidden bg-blue-700 rounded-tl-md  rounded-bl-md `}
      >
        <div className="flex flex-col gap-5 ">
          <ul className="flex flex-col gap-5 font-medium mr-10 text-white ">
            <li>Home</li>
            <li>Finance</li>
            <li>Technology</li>
            <li>Gaming</li>
            <li>LifeStyle</li>
          </ul>
          <div>
            <button className="font-medium text-white">
              {" "}
              <NavLink to={"/login"}>login</NavLink>{" "}
            </button>
          </div>

          <button className="text-blue-600 px-7 rounded font-medium bg-white py-1">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
