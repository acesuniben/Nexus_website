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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <div className="flex items-center space-x-4">
            <h1
              className="text-2xl lg:text-3xl font-bold tracking-tight"
              style={{ color: "#166D86" }}
            >
              Forum
            </h1>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 px-3 py-1 rounded-full shadow-sm border border-blue-100/50">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#166D86" }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {forums.length} discussions
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search discussions..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchForums}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
              style={{
                backgroundColor: "#166D86",
                color: "white",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#124f63";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#166D86";
                }
              }}
            >
              <svg
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isLoading ? "Loading..." : "Refresh"}</span>
            </button>

            {/* Add Forum Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: "#166D86",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#124f63";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#166D86";
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Discussion</span>
            </button>
          </div>
        </div>

        {/* Forum Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div
            className="px-8 py-4 border-b border-gray-100"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-6">
                <div className="min-w-[80px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  ID
                </div>
                <div className="min-w-[200px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Title
                </div>
                <div className="min-w-[300px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Description
                </div>
                <div className="min-w-[150px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date
                </div>
              </div>
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Status
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="p-4 space-y-3 bg-gray-100">
            {isLoading ? (
              <div className="px-6 py-12 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-6 w-6"
                    style={{ color: "#166D86" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-gray-600 font-medium">
                    Loading discussions...
                  </span>
                </div>
              </div>
            ) : forums.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No discussions found
                </h3>
                <p className="mt-2 text-gray-500">
                  Get started by creating your first forum discussion.
                </p>
              </div>
            ) : (
              forums.map((forum, index) => (
                <div
                  key={forum.id}
                  className="bg-white px-8 py-4 hover:bg-gray-50 transition-colors duration-200 group rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-6">
                      {/* Forum ID */}
                      <div className="min-w-[80px]">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2F327D" }}
                        >
                          #{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="min-w-[200px]">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2F327D" }}
                          title={forum.title}
                        >
                          {forum.title.length > 30
                            ? `${forum.title.substring(0, 30)}...`
                            : forum.title}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="min-w-[300px]">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#2F327D" }}
                          title={forum.description}
                        >
                          {forum.description.length > 50
                            ? `${forum.description.substring(0, 50)}...`
                            : forum.description}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center space-x-2 min-w-[150px]">
                        <Image
                          src="/dateIcon.png"
                          alt="Date"
                          width={16}
                          height={16}
                          className="flex-shrink-0"
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#2F327D" }}
                        >
                          {forum.date}
                        </span>
                      </div>
                    </div>

                    {/* Right side - Status */}
                    <div className="flex items-center space-x-4">
                      {/* Status */}
                      <span
                        className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: "#E0F7F6",
                          color: "#166D86",
                          border: "1px solid #B2DFDB",
                        }}
                      >
                        {forum.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {forums.length} discussions
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: "#166D86" }}
            >
              1
            </button>
            <button
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              disabled
            >
              Next
            </button>
          </div>
        </div>
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
