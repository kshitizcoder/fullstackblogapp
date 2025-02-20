import { FormEvent, useEffect, useState } from "react";
import { useForgetPasswordMutation } from "../redux/auth/authApi";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading, isError, error, data, isSuccess }] =
    useForgetPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgetPassword(email).unwrap();
    } catch (err) {
      if (isError) {
        if ("data" in error && error.data && typeof error.data === "object") {
          toast.error(
            (error.data as { message?: string })?.message || "An error occurred"
          );
        }
      }
    }
  };
  if (data) {
    // console.log(data);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isSuccess]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        {/* {data && <p className="text-green-500">{data.message}</p>}
        {error && <p className="text-red-500">{error.data?.message}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
