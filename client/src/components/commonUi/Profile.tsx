import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/auth/userApi";

import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { BASE_URL } from "../../redux/api";
import { MdPhotoCameraBack, MdModeEdit } from "react-icons/md";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data, refetch } = useProfileQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });
  const [imageFileUrl, setImageUrl] = useState<string>("");
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [update, { isSuccess }] = useUpdateProfileMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhoto(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (name) formData.append("name", name);

    if (photo) {
      formData.append("photo", photo);
    }
    try {
      await update(formData).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Update SuccessFul");
      setIsEdit(false);
    }
  }, [isSuccess]);
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-100 flex flex-col items-center space-y-4"
      >
        <div className="flex items-center w-full justify-center">
          <h2 className="text-2xl font-semibold  text-gray-700">Profile</h2>

          <div className="flex justify-end w-full">
            <MdModeEdit
              className={` rounded-full p-2 ${
                isEdit ? "bg-blue-600 text-white " : ""
              } text-5xl`}
              onClick={() => setIsEdit(!isEdit)}
            />
          </div>
        </div>
        <input
          ref={filePickerRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
        <div className="flex flex-col items-center space-y-2 relative">
          <img
            // onClick={() => filePickerRef.current?.click()}
            src={imageFileUrl || `${BASE_URL}/users/${data?.user?.photo}`}
            alt="User"
            className="w-35 h-35 rounded-full border-2 border-gray-300 object-cover"
          />

          <div
            className={`absolute z-50 flex justify-center items-center bg-blue-600 w-35 h-35 rounded-full transition duration-300 ${
              isEdit ? "opacity-[70%]" : "opacity-0"
            }`}
          >
            <div
              onClick={() => isEdit && filePickerRef.current?.click()}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-white w-[80%] text-center">
                Click Choose Photo
              </p>
              <MdPhotoCameraBack className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            className={`${
              isEdit ? "" : "cursor-not-allowed"
            } w-full px-4 py-2 border rounded-lg focus:outline-none capitalize`}
            type="text"
            placeholder="Name"
            readOnly={!isEdit}
            onChange={(e) => setName(e.target.value)}
            defaultValue={data?.user?.name}
            autoComplete="off"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border focus:outline-none rounded-lg bg-gray-100 cursor-not-allowed"
            type="email"
            placeholder="Email"
            defaultValue={data?.user?.email}
            readOnly
            autoComplete="off"
          />
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
