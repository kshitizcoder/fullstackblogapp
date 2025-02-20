import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayouts: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navgiate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== "user") {
      navgiate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default UserLayouts;
