"use client";

import { useState } from "react";
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

const forumData: ForumItem[] = [
  {
    id: "#876364",
    title: "ACES Week",
    description: "Anticipate the ACES Week",
    date: "12 Dec, 2020",
    status: "Complete",
  },
  ...Array(8).fill({
    id: "#876364",
    title: "Happy Birthday Elijah",
    description: "Birthday Greetings",
    date: "15 Dec, 2025",
    status: "Complete",
  }),
];

export default function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forums, setForums] = useState<ForumItem[]>(forumData);

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
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Create forum post
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/forum/create",
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
        const newForumData = await response.json();

        // Add to local state for immediate UI update
        const newForum: ForumItem = {
          id: newForumData.id || `#${Math.random().toString(36).substr(2, 6)}`,
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          status: "Active",
        };

        setForums((prev) => [newForum, ...prev]);
        console.log("Forum created successfully:", newForumData);
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create forum posts.");
      } else {
        const errorData = await response.json();
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
            {forums.map((item, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-4 px-2">
                  <input type="checkbox" />
                </td>
                <td className="py-4 px-2 text-gray-700">{item.id}</td>
                <td className="py-4 px-2 text-gray-700">{item.title}</td>
                <td className="py-4 px-2 text-gray-700">{item.description}</td>
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
            ))}
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
