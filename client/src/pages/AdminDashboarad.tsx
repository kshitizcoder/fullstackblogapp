import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import Profile from "../components/commonUi/Profile";
import UpdatePassword from "../components/updatePassword/UpdatePassword";
import AdminBlogs from "../components/admin/AdminBlogs";
import AddBlog from "../components/author/AddBlog";
import AdminComments from "../components/admin/AdminComments";
import User from "../components/admin/User";
import AdminStats from "../components/admin/AdminStats";

const AdminDashboarad: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (!tabFromUrl) {
      navigate("/author-dashboard?tab=analytics", { replace: true });
    }
  }, [location.search, navigate]);

  const getCurrentTab = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("tab") || "analytics";
  };
  return (
    <section className="md:px-5 mt-15 flex flex-col lg:flex-row">
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
          <AdminSideBar toggleSideBar={() => setIsOpen(false)} />
        </div>
      </div>
      <div className="w-full">
        {getCurrentTab() === "profile" && <Profile />}
        {getCurrentTab() === "change-password" && <UpdatePassword />}
        {getCurrentTab() === "all-blogs" && <AdminBlogs />}
        {getCurrentTab() === "add-blog" && <AddBlog />}
        {getCurrentTab() === "all-comments" && <AdminComments />}
        {getCurrentTab() === "all-users" && <User />}
        {getCurrentTab() === "analytics" && <AdminStats />}
      </div>
    </section>
  );
};

export default AdminDashboarad;
