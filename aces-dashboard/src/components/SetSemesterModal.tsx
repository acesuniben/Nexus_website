"use client";

import { useState } from "react";

interface SetSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (semester: string, session: string) => void;
  isLoading?: boolean;
}

export default function SetSemesterModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: SetSemesterModalProps) {
  const [semester, setSemester] = useState("First");
  const [session, setSession] = useState("2024/2025");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(semester, session);
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Set Current Semester
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Configure the active semester for timetable operations
        </p>

        <div className="space-y-4">
          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
            </select>
          </div>

          {/* Session Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session (e.g., 2024/2025)
            </label>
            <input
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="2024/2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Setting..." : "Set Semester"}
          </button>
        </div>
      </div>
    </div>
  );
}
