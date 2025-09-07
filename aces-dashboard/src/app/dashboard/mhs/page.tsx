"use client";

import { useState } from "react";
import Image from "next/image";
import AddMHSModal from "@/components/AddMHSModal";

interface MHSItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  volume?: string;
}

interface MHSFormData {
  title: string;
  volume: string;
  description: string;
  date: string;
  image?: File;
}

const mhsData: MHSItem[] = [
  {
    id: "#876364",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876365",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876366",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876367",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876368",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876369",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876370",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876371",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
  {
    id: "#876372",
    title: "ACES MHS Week",
    description: "Sleep well and eat well",
    date: "12 Dec, 2020",
    status: "Posted",
  },
];

export default function MHSPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mhsItems, setMhsItems] = useState<MHSItem[]>(mhsData);

  const handleAddMHS = async (formData: MHSFormData) => {
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

      // Create MHS post
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/acesmhs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            volume: formData.volume,
            Description: formData.description, // Note: capital 'D' as per schema
            datePublished: formData.date,
            imageUrl: imageUrl,
          }),
        }
      );

      if (response.ok) {
        const newMHSData = await response.json();

        // Add to local state for immediate UI update
        const newMHS: MHSItem = {
          id: newMHSData.id || `#${Math.random().toString(36).substr(2, 6)}`,
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          status: "Posted",
        };

        setMhsItems((prev) => [newMHS, ...prev]);
        console.log("MHS created successfully:", newMHSData);
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create MHS posts.");
      } else {
        const errorData = await response.json();
        console.error("Failed to create MHS:", errorData);
        alert(
          `Failed to create MHS: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding MHS:", error);
      alert("An error occurred while creating the MHS post. Please try again.");
    }
  };

  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#166D86" }}>
            MHS
          </h1>
          <p className="text-gray-600">Manage Mental Health Services content</p>
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
                <input type="checkbox" className="mr-2" />
                MHS Ref
              </th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Description</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {mhsItems.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-900 font-medium">{item.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900">{item.title}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-600">{item.description}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-gray-900">{item.date}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: "#166D86" }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-red-500 hover:text-red-700 transition">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add MHS Modal */}
      <AddMHSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMHS}
      />
    </div>
  );
}
