import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAddBlogMutation } from "../../redux/blog/blogApi";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../redux/category/categoryApi";
import { toast } from "react-toastify";

type CustomErrorData = {
  message: string;
};
type Category = {
  _id: string;
  categoryName: string;
};

const AddBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const [addBlog, { isLoading, isError, error, isSuccess }] =
    useAddBlogMutation();
  const {
    data,
    isError: categeoryIsError,
    isLoading: categoryIsLoading,
    error: catgeoryError,
  } = useGetAllCategoriesQuery(0);
  const addTag = (): void => {
    if (inputValue.trim() !== "") {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (index: number): void => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnailImage) formData.append("thumbnailImage", thumbnailImage);
    if (coverImage) formData.append("coverImage", coverImage);
    formData.append("category", category);

    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    await addBlog(formData).unwrap();
    console.log(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog Is Created Successfully");
      navigate("/author-dashboard");
    }
  }, [isSuccess]);

  if (isError) {
    if ("data" in error) {
      const errorData = error.data as CustomErrorData;
      toast.error(errorData.message);
    }
  }

  if (categeoryIsError) {
    if ("data" in catgeoryError) {
      const errorData = catgeoryError.data as CustomErrorData;
      toast.error(errorData.message);
    }
  }
  return (
    <section className="px-5 mt-5">
      <form
        onSubmit={handleSubmit}
        className="md:max-w-3xl mx-auto  md:p-6 py-7 bg-white shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold">Create Blog</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none  "
            placeholder="Enter title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter content"
            rows={10}
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setThumbnailImage(e.target.files?.[0] || null)
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image Cover</label>
          <input
            type="file"
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCoverImage(e.target.files?.[0] || null)
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border capitalize rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
            value={category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoryIsLoading ? (
              <option disabled>Loading...</option>
            ) : (
              data?.categories?.map((category: Category) => {
                return (
                  <option
                    key={category?._id}
                    className="capitalize"
                    value={category?._id}
                  >
                    {category.categoryName}
                  </option>
                );
              })
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  className="ml-2 text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveTag(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="w-full">
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Add a tag"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
            </div>
            <div>
              <button
                type="button"
                onClick={addTag}
                className="bg-blue-500 rounded  text-white px-5 py-1"
              >
                AddTag
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Blog
        </button>
      </form>
    </section>
  );
};

export default AddBlog;
