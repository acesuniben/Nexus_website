"use client";

import { useState, useEffect } from "react";

interface MHSItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  volume?: string;
  imageUrl?: string;
}

interface UpdateMHSForm {
  title: string;
  description: string;
  date: string;
  volume: string;
}

interface UpdateMHSModalProps {
  isOpen: boolean;
  onClose: () => void;
  mhs: MHSItem | null;
  onUpdate: (updatedMHS: MHSItem) => void;
}

export default function UpdateMHSModal({
  isOpen,
  onClose,
  mhs,
  onUpdate,
}: UpdateMHSModalProps) {
  const [updateForm, setUpdateForm] = useState<UpdateMHSForm>({
    title: mhs?.title || "",
    description: mhs?.description || "",
    date: mhs?.date || "",
    volume: mhs?.volume || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when mhs prop changes
  useEffect(() => {
    if (mhs) {
      setUpdateForm({
        title: mhs.title,
        description: mhs.description,
        date: mhs.date,
        volume: mhs.volume || "",
      });
    }
  }, [mhs]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleClose = () => {
    setUpdateForm({
      title: "",
      description: "",
      date: "",
      volume: "",
    });
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mhs) return;

    // Validation
    if (!updateForm.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!updateForm.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!updateForm.date.trim()) {
      setError("Date is required");
      return;
    }

    if (!updateForm.volume.trim()) {
      setError("Volume is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const response = await fetch(
        `https://aces-utky.onrender.com/api/admin/acesmhs/update/${mhs.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: updateForm.title.trim(),
            description: updateForm.description.trim(),
            date: updateForm.date.trim(),
            volume: updateForm.volume.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update MHS post");
      }

      const updatedMHSData = await response.json();

      // Create updated MHS object with the same structure as the original
      const updatedMHS: MHSItem = {
        ...mhs,
        title: updatedMHSData.title || updateForm.title.trim(),
        description:
          updatedMHSData.description || updateForm.description.trim(),
        date: updatedMHSData.date || updateForm.date.trim(),
        volume: updatedMHSData.volume || updateForm.volume.trim(),
      };

      onUpdate(updatedMHS);
      onClose();
    } catch (error: any) {
      console.error("Error updating MHS:", error);
      setError(error.message || "Failed to update MHS post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !mhs) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{ color: "#166D86" }}>
              Update MHS Post
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              disabled={isLoading}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={updateForm.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter MHS post title"
                required
                disabled={isLoading}
              />
            </div>

            {/* Volume Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volume
              </label>
              <input
                type="text"
                name="volume"
                value={updateForm.volume}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter volume (e.g., Vol. 1, Issue 2)"
                required
                disabled={isLoading}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={updateForm.description}
                onChange={handleInputChange}
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
                placeholder="Enter MHS post description"
                required
                disabled={isLoading}
              />
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date
              </label>
              <input
                type="date"
                name="date"
                value={updateForm.date}
                onChange={handleInputChange}
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
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !updateForm.title ||
                  !updateForm.description ||
                  !updateForm.date ||
                  !updateForm.volume
                }
                className="flex-1 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#166D86",
                }}
              >
                {isLoading ? "Updating..." : "Update MHS Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
