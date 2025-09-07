"use client";

import { useState } from "react";
import Image from "next/image";
import AddTimetableModal from "@/components/AddTimetableModal";

interface TimetableItem {
  id: string;
  lectureTime: string;
  courseCode: string;
  courseTitle: string;
  day: string;
  level: string;
  status: string;
}

interface TimetableFormData {
  lectureTime: string;
  courseCode: string;
  courseTitle: string;
  day: string;
  level: string;
  status: string;
}

const timetableData: TimetableItem[] = [
  {
    id: "1",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "2",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "3",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "4",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "5",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "6",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "7",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
  {
    id: "8",
    lectureTime: "9:00 am - 10:00 am",
    courseCode: "CPE 362",
    courseTitle: "Software Engineering II",
    day: "Wednesday",
    level: "300L",
    status: "Uploaded",
  },
];

export default function TimetablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timetableItems, setTimetableItems] =
    useState<TimetableItem[]>(timetableData);
  const [selectedSemester, setSelectedSemester] = useState("Second Semester");
  const [selectedLevel, setSelectedLevel] = useState("300L");
  const [selectedDay, setSelectedDay] = useState("Wednesday");

  const handleAddTimetable = async (formData: TimetableFormData) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Create Timetable entry
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/timetable/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lectureTime: formData.lectureTime,
            courseCode: formData.courseCode,
            courseTitle: formData.courseTitle,
            day: formData.day,
            level: formData.level,
            status: formData.status,
          }),
        }
      );

      if (response.ok) {
        const newTimetableData = await response.json();

        // Add to local state for immediate UI update
        const newTimetable: TimetableItem = {
          id:
            newTimetableData.id || `${Math.random().toString(36).substr(2, 6)}`,
          lectureTime: formData.lectureTime,
          courseCode: formData.courseCode,
          courseTitle: formData.courseTitle,
          day: formData.day,
          level: formData.level,
          status: formData.status,
        };

        setTimetableItems((prev) => [newTimetable, ...prev]);
        console.log("Timetable created successfully:", newTimetableData);
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create timetable entries.");
      } else {
        const errorData = await response.json();
        console.error("Failed to create timetable:", errorData);
        alert(
          `Failed to create timetable: ${
            errorData.message || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error adding timetable:", error);
      alert(
        "An error occurred while creating the timetable entry. Please try again."
      );
    }
  };

  const filteredTimetable = timetableItems.filter(
    (item) => item.level === selectedLevel && item.day === selectedDay
  );

  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#166D86" }}>
            Timetable
          </h1>
          <p className="text-gray-600">
            Manage course schedules and timetables
          </p>
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
            + Add Time Table
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Semester Dropdown */}
        <div className="relative">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
            onFocus={(e) => {
              e.target.style.borderColor = "#166D86";
              e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Level Dropdown */}
        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
            onFocus={(e) => {
              e.target.style.borderColor = "#166D86";
              e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="100L">100L</option>
            <option value="200L">200L</option>
            <option value="300L">300L</option>
            <option value="400L">400L</option>
            <option value="500L">500L</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Day Dropdown */}
        <div className="relative">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
            onFocus={(e) => {
              e.target.style.borderColor = "#166D86";
              e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-4 font-medium">Lecture Time</th>
              <th className="py-3 px-4 font-medium">Course Code</th>
              <th className="py-3 px-4 font-medium">Course Title</th>
              <th className="py-3 px-4 font-medium">Day</th>
              <th className="py-3 px-4 font-medium">Level</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimetable.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-gray-900">{item.lectureTime}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 font-medium">
                    {item.courseCode}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900">{item.courseTitle}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: "#166D86" }}
                    ></span>
                    <span className="text-gray-900">{item.day}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900">{item.level}</span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: "#166D86" }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Timetable Modal */}
      <AddTimetableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTimetable}
      />
    </div>
  );
}
