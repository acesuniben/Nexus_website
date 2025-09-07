"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddBlogModal from "@/components/AddBlogModal";

interface BlogItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  imageUrl?: string;
}

interface BlogFormData {
  title: string;
  description: string;
  date: string;
  image?: File;
}

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      // Ensure we're on the client side
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.log("No token found in localStorage");
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      console.log("Token found, fetching blogs...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/blog/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blogsData = await response.json();
        console.log("Blogs data received:", blogsData);

        // Handle the response structure with entries array
        let blogsArray = [];
        if (
          blogsData &&
          blogsData.entries &&
          Array.isArray(blogsData.entries)
        ) {
          blogsArray = blogsData.entries;
          console.log(`Found ${blogsArray.length} blogs`);
        } else {
          console.error("Expected entries array but received:", blogsData);
          setBlogs([]);
          setIsLoading(false);
          return;
        }

        // Map the API response to match our BlogItem interface
        const mappedBlogs: BlogItem[] = blogsArray.map((blog: any) => ({
          id: blog.id || `#${Math.random().toString(36).substr(2, 6)}`,
          title: blog.title,
          description: blog.Description || blog.description,
          date: blog.datePublished
            ? new Date(blog.datePublished).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          status: "Published", // Default status
          imageUrl: blog.imageUrl,
        }));
        setBlogs(mappedBlogs);
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch blogs:", response.statusText);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 100); // Small delay to ensure localStorage is available

    return () => clearTimeout(timer);
  }, []);

  const handleAddBlog = async (formData: BlogFormData) => {
    try {
      let imageUrl = "";

      // Upload image first if provided
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.image);
        imageFormData.append("upload_preset", "your-upload-preset"); // You'll need to configure this in Cloudinary

        const imageResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dcldvsih8/image/upload",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.secure_url;
        }
      }

      // Get token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Create Blog post
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/blog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            Description: formData.description, // Note: capital 'D' as per schema
            datePublished: formData.date,
            imageUrl: imageUrl,
          }),
        }
      );

      if (response.ok) {
        const newBlogData = await response.json();
        console.log("Blog created successfully:", newBlogData);

        // Refetch blogs to get the latest data from server
        await fetchBlogs();
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create blog posts.");
      } else {
        const errorData = await response.json();
        console.error("Failed to create blog:", errorData);
        alert(
          `Failed to create blog: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(
        "An error occurred while creating the blog post. Please try again."
      );
    }
  };

  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#166D86" }}>
            Blog
          </h1>
          <p className="text-gray-600">Manage blog posts and articles</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
              onFocus={(e) => {
                e.target.style.borderColor = "#166D86";
                e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition font-semibold"
            style={{ backgroundColor: "#166D86" }}
          >
            + Add Blog Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading blogs...</div>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">Blog ID</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium">Date Published</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No blog posts found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <span className="text-gray-900 font-medium text-sm">
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 font-medium">
                        {blog.title}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600 truncate max-w-xs block">
                        {blog.description}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        <span className="text-gray-900">{blog.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          blog.status === "Published"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                        style={{
                          backgroundColor:
                            blog.status === "Published" ? "#10b981" : "#f59e0b",
                        }}
                      >
                        {blog.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Blog Modal */}
      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBlog}
      />
    </div>
  );
}
