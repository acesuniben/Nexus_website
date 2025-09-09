"use client";

import { useState, useEffect } from "react";

interface BlogItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  imageUrl?: string;
}

interface UpdateBlogForm {
  title: string;
  description: string;
  date: string;
}

interface UpdateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogItem | null;
  onUpdate: (updatedBlog: BlogItem) => void;
}

export default function UpdateBlogModal({
  isOpen,
  onClose,
  blog,
  onUpdate,
}: UpdateBlogModalProps) {
  const [updateForm, setUpdateForm] = useState<UpdateBlogForm>({
    title: blog?.title || "",
    description: blog?.description || "",
    date: blog?.date || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when blog prop changes
  useEffect(() => {
    if (blog) {
      setUpdateForm({
        title: blog.title,
        description: blog.description,
        date: blog.date,
      });
    }
  }, [blog]);

  const handleUpdateFormChange = (field: string, value: string) => {
    setUpdateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const requestBody = {
        title: updateForm.title,
        Description: updateForm.description, // Note: capital 'D' as per API schema
        datePublished: updateForm.date,
      };

      const response = await fetch(
        `https://aces-utky.onrender.com/api/admin/blog/update/${blog.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog post");
      }

      const data = await response.json();
      console.log("Blog post updated successfully:", data);

      // Create updated blog object
      const updatedBlog: BlogItem = {
        ...blog,
        title: updateForm.title,
        description: updateForm.description,
        date: updateForm.date,
      };

      // Call the onUpdate callback to update the parent component
      onUpdate(updatedBlog);

      // Close modal
      onClose();
    } catch (err: any) {
      console.error("Error updating blog post:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUpdateForm({
      title: "",
      description: "",
      date: "",
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{ color: "#166D86" }}>
              Update Blog Post
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleUpdateSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={updateForm.title}
                onChange={(e) =>
                  handleUpdateFormChange("title", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={updateForm.description}
                onChange={(e) =>
                  handleUpdateFormChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200 resize-none"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter blog description"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date
              </label>
              <input
                type="date"
                value={updateForm.date}
                onChange={(e) => handleUpdateFormChange("date", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !updateForm.title ||
                  !updateForm.description ||
                  !updateForm.date
                }
                className="flex-1 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#166D86",
                }}
              >
                {isLoading ? "Updating..." : "Update Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
