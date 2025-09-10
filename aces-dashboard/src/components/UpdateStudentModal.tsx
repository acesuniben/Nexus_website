"use client";

import { useState, useEffect } from "react";

interface Student {
  id: string;
  matriculationNumber: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  level: string;
  status: string;
  profileImage?: string;
}

interface UpdateForm {
  fullName: string;
  email: string;
  dateOfBirth: string;
  level: string;
  matriculationNumber: string;
}

interface UpdateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onUpdate: (updatedStudent: Student) => void;
}

export default function UpdateStudentModal({
  isOpen,
  onClose,
  student,
  onUpdate,
}: UpdateStudentModalProps) {
  const [updateForm, setUpdateForm] = useState<UpdateForm>({
    fullName: student?.fullName || "",
    email: student?.email || "",
    dateOfBirth: student?.dateOfBirth || "",
    level: student?.level || "",
    matriculationNumber: student?.matriculationNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when student prop changes
  useEffect(() => {
    if (student) {
      setUpdateForm({
        fullName: student.fullName,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        level: student.level,
        matriculationNumber: student.matriculationNumber,
      });
    }
  }, [student]);

  const handleUpdateFormChange = (field: string, value: string) => {
    setUpdateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const response = await fetch(
        `https://aces-utky.onrender.com/api/admin/students/update/${student.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateForm),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      const data = await response.json();
      console.log("Student updated successfully:", data);

      // Create updated student object
      const updatedStudent: Student = {
        ...student,
        ...updateForm,
      };

      // Call the onUpdate callback to update the parent component
      onUpdate(updatedStudent);

      // Close modal
      onClose();
    } catch (err: any) {
      console.error("Error updating student:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUpdateForm({
      fullName: "",
      email: "",
      dateOfBirth: "",
      level: "",
      matriculationNumber: "",
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: "#166D86" }}>
              Update Student
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          <form onSubmit={handleUpdateSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={updateForm.fullName}
                  onChange={(e) =>
                    handleUpdateFormChange("fullName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={updateForm.email}
                  onChange={(e) =>
                    handleUpdateFormChange("email", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
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

              {/* Matriculation Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matriculation Number
                </label>
                <input
                  type="text"
                  value={updateForm.matriculationNumber}
                  onChange={(e) =>
                    handleUpdateFormChange(
                      "matriculationNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
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

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={updateForm.dateOfBirth}
                  onChange={(e) =>
                    handleUpdateFormChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
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

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  value={updateForm.level}
                  onChange={(e) =>
                    handleUpdateFormChange("level", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#166D86";
                    e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="100L">100L</option>
                  <option value="200L">200L</option>
                  <option value="300L">300L</option>
                  <option value="400L">400L</option>
                  <option value="500L">500L</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                style={{
                  backgroundColor: "#166D86",
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
                {isLoading ? "Updating..." : "Update Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
