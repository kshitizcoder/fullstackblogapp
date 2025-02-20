import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/auth/authApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [resetPassword, { isLoading, error, isError, data, isSuccess }] =
    useResetPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await resetPassword({ token, password, passwordConfirm });
  };
  if (data) {
    console.log(data);
  }
  if (isError) {
    if ("data" in error && error.data && typeof error.data === "object") {
      toast.error(
        (error.data as { message?: string })?.message || "An error occurred"
      );
    }
  }
  if (isSuccess) {
    if (isSuccess) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        {/* {data && <p className="text-green-500">{data.message}</p>}
        {error && <p className="text-red-500">{error.data?.message}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
