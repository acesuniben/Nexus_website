"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddForumModal from "@/components/AddForumModal";

interface ForumItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
}

interface ForumFormData {
  title: string;
  description: string;
  date: string;
  image?: File;
}

export default function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forums, setForums] = useState<ForumItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch forums from API
  const fetchForums = async () => {
    try {
      // Ensure we're on the client side
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("adminToken"); // Changed from "token" to "adminToken"
      if (!token) {
        console.log("No token found in localStorage");
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      console.log("Token found, fetching forums...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/forum/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const forumsData = await response.json();
        console.log("Forums data received:", forumsData);
        console.log("Type of forumsData:", typeof forumsData);
        console.log("Is forumsData an array?", Array.isArray(forumsData));

        // Handle different possible response structures
        let forumsArray = [];
        if (Array.isArray(forumsData)) {
          forumsArray = forumsData;
        } else if (
          forumsData &&
          forumsData.entries &&
          Array.isArray(forumsData.entries)
        ) {
          forumsArray = forumsData.entries;
          console.log(`Found ${forumsArray.length} forums in entries array`);
        } else if (
          forumsData &&
          forumsData.data &&
          Array.isArray(forumsData.data)
        ) {
          forumsArray = forumsData.data;
        } else if (
          forumsData &&
          forumsData.forums &&
          Array.isArray(forumsData.forums)
        ) {
          forumsArray = forumsData.forums;
        } else {
          console.error("Expected array but received:", forumsData);
          setForums([]);
          setIsLoading(false);
          return;
        }

        console.log("Forums array to map:", forumsArray);

        // Map the API response to match our ForumItem interface
        const mappedForums: ForumItem[] = forumsArray.map((forum: any) => ({
          id: forum.id || `#${Math.random().toString(36).substr(2, 6)}`,
          title: forum.title,
          description: forum.Description || forum.description,
          date: forum.datePublished
            ? new Date(forum.datePublished).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          status: "Complete", // Default status, adjust as needed based on API response
        }));
        setForums(mappedForums);
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken"); // Changed from "token" to "adminToken"
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch forums:", response.statusText);
        // Fallback to empty array if fetch fails
        setForums([]);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
      setForums([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch forums on component mount with a small delay to ensure localStorage is available
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchForums();
    }, 100); // Small delay to ensure localStorage is available

    return () => clearTimeout(timer);
  }, []);

  const handleAddForum = async (formData: ForumFormData) => {
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
      const token = localStorage.getItem("adminToken"); // Changed from "token" to "adminToken"
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Create forum post
      const requestBody = {
        title: formData.title || "Untitled Forum",
        Description: formData.description || "No description provided",
        datePublished: formData.date
          ? new Date(formData.date).toISOString().split("T")[0]
          : "2025-01-10",
        imageUrl:
          imageUrl ||
          "https://res.cloudinary.com/dcldvsih8/image/upload/v1730732213/WhatsApp_Image_2024-11-04_at_3.54.34_PM_ehgwqx.jpg",
      };

      console.log("Sending request body:", requestBody);
      console.log("Token:", token);

      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/forum/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const newForumData = await response.json();
        console.log("Forum created successfully:", newForumData);

        // Refetch forums to get the latest data from server
        await fetchForums();
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken"); // Changed from "token" to "adminToken"
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create forum posts.");
      } else {
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries())
        );

        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          console.log("Failed to parse error response as JSON:", e);
          errorData = { message: response.statusText };
        }

        console.error("Failed to create forum:", errorData);
        alert(
          `Failed to create forum: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding forum:", error);
      alert("An error occurred while creating the forum. Please try again.");
    }
  };
  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold" style={{ color: "#166D86" }}>
          Forum
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-opacity-50"
              style={{ "--tw-ring-color": "#166D86" } as React.CSSProperties}
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition font-semibold"
            style={{ backgroundColor: "#166D86" }}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-2 font-medium">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-2 font-medium">Forum ID</th>
              <th className="py-3 px-2 font-medium">Title</th>
              <th className="py-3 px-2 font-medium">Description</th>
              <th className="py-3 px-2 font-medium">Date</th>
              <th className="py-3 px-2 font-medium">Status</th>
              <th className="py-3 px-2 font-medium text-right">
                <span className="text-red-400">🗑️</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin mr-2"
                      style={{ borderColor: "#166D86" }}
                    ></div>
                    <span className="text-gray-600">Loading forums...</span>
                  </div>
                </td>
              </tr>
            ) : forums.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <span className="text-gray-500">
                    No forums found. Create your first forum post!
                  </span>
                </td>
              </tr>
            ) : (
              forums.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-4 px-2 text-gray-700">{item.id}</td>
                  <td className="py-4 px-2 text-gray-700">{item.title}</td>
                  <td className="py-4 px-2 text-gray-700">
                    {item.description}
                  </td>
                  <td className="py-4 px-2 text-gray-700 flex items-center gap-2">
                    <span style={{ color: "#166D86" }}>📅</span> {item.date}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className="px-6 py-2 rounded-full font-semibold text-sm"
                      style={{ backgroundColor: "#F0F9FF", color: "#166D86" }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-red-400 hover:text-red-600">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Forum Modal */}
      <AddForumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddForum}
      />
    </div>
  );
}
