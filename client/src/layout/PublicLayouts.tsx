import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PublicLayouts: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin-dashboard?tab=analytics");
      } else if (userInfo.role === "author") {
        navigate("/author-dashboard?tab=profile");
      } else if (userInfo.role === "user") {
        navigate("/");
      }
    }
  }, [userInfo]);
  return <Outlet />;
};

export default PublicLayouts;
