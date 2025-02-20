import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayouts from "./layout/PublicLayouts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AdminLayouts from "./layout/AdminLayouts";
import AdminDashboarad from "./pages/AdminDashboarad";
import AuthorDashboard from "./pages/AuthorDashboard";
import AuthorLayouts from "./layout/AuthorLayouts";
import UserLayouts from "./layout/UserLayouts";
import UserDashbaord from "./pages/UserDashboard";

import CategoryBlog from "./pages/CategoryBlog";
import BlogDetails from "./pages/BlogDetails";
import SearchResult from "./pages/SearchResult";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateBlog from "./components/author/UpdateBlog";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/commonUi/Navbar";

// https://dribbble.com/shots/17634792-News-Reporting-Page
const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        aria-label="Notification container"
        position="top-right"
        // position="top-left"
        autoClose={3000}
      />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:catgeory" element={<CategoryBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/blogs" element={<SearchResult />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/admin-dashboard" element={<AdminLayouts />}>
            <Route index element={<AdminDashboarad />} />
            <Route path="update-blog/:id" element={<UpdateBlog />} />
          </Route>

          <Route path="/author-dashboard" element={<AuthorLayouts />}>
            <Route index element={<AuthorDashboard />} />
            <Route path="update-blog/:id" element={<UpdateBlog />} />
          </Route>

          <Route path="/user-dashboard" element={<UserLayouts />}>
            <Route index element={<UserDashbaord />} />
          </Route>

          <Route path="/" element={<PublicLayouts />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
