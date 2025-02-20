import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useGetBLogsByAuthorQuery,
  useUpdateBlogMutation,
} from "../../redux/blog/blogApi";
import { useGetAllCategoriesQuery } from "../../redux/category/categoryApi";
import { toast } from "react-toastify";
import { BASE_URL } from "../../redux/api";

type Category = {
  _id: string;
  categoryName: string;
};

type FormData = {
  title: string;
  content: string;
  category: string;
  tags: string[];
  thumbnailImage: File | string;
  coverImage: File | string;
  thumbnailPreview: string;
  coverPreview: string;
};

const UpdateBlog = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetBlogByIdQuery(id);
  const [updateBlog, { isSuccess }] = useUpdateBlogMutation();
  const { data } = useGetAllCategoriesQuery(0);
  const { refetch } = useGetBLogsByAuthorQuery(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    category: "",
    tags: [],
    thumbnailImage: "",
    coverImage: "",
    thumbnailPreview: "",
    coverPreview: "",
  });

  const [inputTag, setInputTag] = useState<string>("");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog?.blog?.title,
        content: blog?.blog?.content,
        category: blog?.blog?.category._id || "",
        tags: blog?.blog?.tags || [],
        thumbnailImage: "",
        coverImage: "",
        thumbnailPreview: blog?.blog?.thumbnailImage,
        coverPreview: blog?.blog?.coverImage,
      });
    }
  }, [blog]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  const addTag = () => {
    if (inputTag.trim() && !formData.tags.includes(inputTag.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, inputTag.trim()],
      }));
      setInputTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("content", formData.content);
    updatedData.append("category", formData.category);
    updatedData.append("tags", JSON.stringify(formData.tags));

    if (formData.thumbnailImage)
      updatedData.append("thumbnailImage", formData.thumbnailImage);
    if (formData.coverImage)
      updatedData.append("coverImage", formData.coverImage);

    await updateBlog({ id, data: updatedData }).unwrap();
    refetch();
  };

  if (isSuccess) {
    toast.success("Blog updated");
    navigate("/author-dashboard?tab=blog-list");
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl  mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <div className="mb-5">
          <Link
            className="bg-blue-500 px-5 rounded py-1 text-white text-xl y-6"
            to="/author-dashboard?tab=profile"
          >
            Back
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />

          {/* Content */}
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full p-2 border rounded"
            rows={5}
          ></textarea>

          {/* Category */}
          <div>
            <label className="block">Category:</label>
            <select
              className="w-full border capitalize rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              onChange={handleChange}
              name="category"
              value={formData.category}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {data?.categories?.map((category: Category) => (
                <option key={category?._id} value={category?._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block">Tags:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-red-500"
                    onClick={() => removeTag(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputTag}
                onChange={handleTagChange}
                placeholder="Add tag"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-blue-500 text-white py-2 px-2 rounded"
              >
                AddTag
              </button>
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block">Thumbnail Image:</label>
            {formData.thumbnailPreview && (
              <img
                src={`${BASE_URL}/thumbnail/${formData.thumbnailPreview}`}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover mb-2"
              />
            )}
            <input
              type="file"
              name="thumbnailImage"
              // onChange={handleFileChange}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  thumbnailImage: e.target.files?.[0] as any,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block">Cover Image:</label>
            {formData.coverPreview && (
              <img
                src={`${BASE_URL}/cover/${formData.coverPreview}`}
                alt="Cover Preview"
                className="w-64 h-40 object-cover mb-2"
              />
            )}
            <input
              type="file"
              name="coverImage"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  coverImage: e.target.files?.[0] as any, // Fix: Correct property reference
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
