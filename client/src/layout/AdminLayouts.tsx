import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const AdminLayouts: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default AdminLayouts;
