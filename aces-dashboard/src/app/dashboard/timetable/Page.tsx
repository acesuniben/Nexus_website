"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddTimetableModal from "@/components/AddTimetableModal";

interface TimetableItem {
  id: string;
  courseTitle: string;
  courseCode: string;
  level: string;
  session: string;
  semester: string;
  creditUnits: number;
  days: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  lecturers: string[];
  status: string;
}

interface TimetableFormData {
  courseTitle: string;
  courseCode: string;
  level: string;
  session: string;
  semester: string;
  creditUnits: number;
  days: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  lecturers: string[];
}

export default function TimetablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timetableItems, setTimetableItems] = useState<TimetableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("Second Semester");
  const [selectedLevel, setSelectedLevel] = useState("500L");
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Fetch timetable data from API
  const fetchTimetableData = async () => {
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

      console.log("Token found, fetching timetable data...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/timetable/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const timetableData = await response.json();
        console.log("Timetable data received:", timetableData);

        // Handle the response structure with entries array
        let timetableArray = [];
        if (
          timetableData &&
          timetableData.entries &&
          Array.isArray(timetableData.entries)
        ) {
          timetableArray = timetableData.entries;
          console.log(`Found ${timetableArray.length} timetable entries`);
        } else {
          console.error("Expected entries array but received:", timetableData);
          setTimetableItems([]);
          setIsLoading(false);
          return;
        }

        // Map the API response to match our TimetableItem interface
        const mappedTimetable: TimetableItem[] = timetableArray.map(
          (item: any) => ({
            id: item.id || `${Math.random().toString(36).substr(2, 6)}`,
            courseTitle: item.courseTitle,
            courseCode: item.courseCode,
            level: item.level,
            session: item.session,
            semester: item.semester,
            creditUnits: item.creditUnits,
            days: item.days || [],
            lecturers: item.lecturers || [],
            status: "Uploaded", // Default status
          })
        );
        setTimetableItems(mappedTimetable);
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch timetable data:", response.statusText);
        setTimetableItems([]);
      }
    } catch (error) {
      console.error("Error fetching timetable data:", error);
      setTimetableItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch timetable data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTimetableData();
    }, 100); // Small delay to ensure localStorage is available

    return () => clearTimeout(timer);
  }, []);

  const handleAddTimetable = async (formData: TimetableFormData) => {
    console.log("handleAddTimetable called with data:", formData);
    try {
      // Get token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Prepare the payload
      const payload = {
        courseTitle: formData.courseTitle,
        level: formData.level,
        session: formData.session,
        semester: formData.semester,
        courseCode: formData.courseCode,
        creditUnits: formData.creditUnits,
        days: formData.days,
        lecturers: formData.lecturers,
      };

      console.log("Sending API request with payload:", payload);

      // Create Timetable entry
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/timetable/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const newTimetableData = await response.json();

        // Refresh the data from API to get the latest state
        await fetchTimetableData();

        console.log("Timetable created successfully:", newTimetableData);
        alert("Timetable entry created successfully!");
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create timetable entries.");
      } else {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || JSON.stringify(errorData);
          console.error("Failed to create timetable:", errorData);
        } catch (parseError) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          console.error("Failed to parse error response:", parseError);
        }
        alert(`Failed to create timetable: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error adding timetable:", error);
      alert(
        "An error occurred while creating the timetable entry. Please try again."
      );
    }
  };

  const filteredTimetable = timetableItems.filter(
    (item) =>
      item.level === selectedLevel &&
      item.days.some((day) => day.day === selectedDay)
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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">
                      Loading timetable data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : filteredTimetable.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                  No timetable entries found for {selectedLevel} on{" "}
                  {selectedDay}
                </td>
              </tr>
            ) : (
              filteredTimetable.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      <span className="text-gray-900">
                        {item.days[0]?.startTime} - {item.days[0]?.endTime}
                      </span>
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
                      <span className="text-gray-900">{item.days[0]?.day}</span>
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
              ))
            )}
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
