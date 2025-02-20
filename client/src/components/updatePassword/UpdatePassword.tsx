import { FormEvent, useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/auth/authApi"; // Import RTK mutation
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [updatePassword, { isLoading, isError, error, isSuccess }] =
    useUpdatePasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePassword({
        passwordCurrent,
        password,
        passwordConfirm,
      }).unwrap();
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
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      setPassword("");
      setPasswordConfirm("");
      setPasswordCurrent("");
    }
  }, [isSuccess]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Update Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Current Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={passwordCurrent}
            onChange={(e) => setPasswordCurrent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Confirm New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
