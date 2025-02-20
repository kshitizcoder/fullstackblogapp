import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && "data" in error;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  console.log(data);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDetails = await login(formData).unwrap();
    dispatch(setCredentials(userDetails.user));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful..");
    }
  }, [isSuccess]);

  return (
    <section>
      <div className="flex justify-center mt-19 h-screen ">
        <div className="flex justify-center  w-full sm:w-[90%]  md:w-[60%] lg:w-[40%] xl:w-[30%] pb-4 bg-pure rounded-lg  shadow-ternary">
          <form
            onSubmit={handleSubmit}
            className="w-full h-[62vh] shadow-md px-4"
          >
            <p className="font-bold text-2xl py-2 text-center">Login</p>
            <div className="mt-4 border-b-[1px]">
              <label htmlFor="" className="block font-medium">
                Email:
              </label>
              <input
                type="email"
                className="w-full py-2 focus:outline-none border-ternary text-sm"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4 border-b-[1px]">
              <label htmlFor="" className="block font-medium">
                Password:
              </label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                className="w-full py-2 focus:outline-none mb-4 text-sm"
                onChange={handleChange}
                placeholder="*****"
              />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="bg-blue-600 w-full py-2 rounded text-white text-center tracking-[.025em]"
                disabled={isLoading}
              >
                Login
              </button>
              <div className="flex justify-end my-3">
                <Link
                  className="text-sm text-blue-500 font-medium hover:underline transition-all duration-300"
                  to={"/forgot-password"}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="text-center mt-3 capitalize text-red-700">
              {isError && (
                <p>
                  {isFetchBaseQueryError(error)
                    ? (error.data as { message?: string })?.message ||
                      "An error occurred."
                    : (error as SerializedError).message ||
                      "An error occurred."}
                </p>
              )}
            </div>
            <div className="flex mt-5 justify-center">
              <p className="text-sm">Don't have an account?</p>
              <Link
                className="ml-2 text-blue-600 transition-all duration-300 ease font-medium hover:underline"
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
