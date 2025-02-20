import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import Profile from "../components/commonUi/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import SavedBlogs from "../components/savedBlog/SavedBlogs";
import DashSideBar from "../components/commonUi/DashSideBar";
import UpdatePassword from "../components/updatePassword/UpdatePassword";
const UserDashbaord: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (!tabFromUrl) {
      navigate("/author-dashboard?tab=profile", { replace: true });
    }
  }, [location.search, navigate]);

  const getCurrentTab = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("tab") || "profile";
  };
  return (
    <section className="px-5 mt-18 flex flex-col lg:flex-row">
      <div>
        <div className="px-5 lg:hidden">
          <IoFilterSharp
            className="lg:hidden text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed py-3 z-50 w-55 px-5 md:w-64 top-12 h-screen bg-white shadow-2xl left-0 inset-y-0 transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <DashSideBar toggleSideBar={() => setIsOpen(false)} />
        </div>
      </div>
      <div className="w-full">
        {/* Render based on the current tab */}
        {getCurrentTab() === "profile" && <Profile />}

        {getCurrentTab() === "saved-blogs" && <SavedBlogs />}

        {getCurrentTab() === "change-password" && <UpdatePassword />}
      </div>
    </section>
  );
};

export default UserDashbaord;
