import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";

const AuthorLayouts: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== "author") {
      navigate("/login");
    }
  }, [userInfo]);
  return <Outlet />;
};

export default AuthorLayouts;
