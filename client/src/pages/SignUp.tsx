import React, { useEffect, useState } from "react";
import { useSignUpMutation } from "../redux/auth/authApi";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type CustomErrorData = {
  message: string;
};
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });
  const [signUp, { isError, error, isLoading, isSuccess }] =
    useSignUpMutation();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const switchTab = (role: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(formData).unwrap();
    } catch (err) {
      console.error("Error during signup", err);
    }
  };
  useEffect(() => {
    if (isError) {
      if ("data" in error) {
        const errorData = error?.data as CustomErrorData;
        toast.error(errorData?.message);
      }
    }
    if (isSuccess) {
      toast.success("SignUp SuccessFul");
      navigate("/login");
    }
  }, [isSuccess, isError]);
  return (
    <section className="flex justify-center h-screen items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6">
          <button
            id="userTab"
            onClick={() => switchTab("user")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              formData.role === "user"
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-200 hover:bg-gray-300"
            } transition-colors  duration-300`}
          >
            User Signup
          </button>
          <button
            id="authorTab"
            onClick={() => switchTab("author")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              formData.role === "author"
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-300`}
          >
            Author Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="role" value={formData.role} />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1  py-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:outline-none"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full capitalize text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
              isLoading ? "bg-blue-900" : "bg-blue-600 "
            }`}
          >
            Create
            <span> {formData.role} </span>
            Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
