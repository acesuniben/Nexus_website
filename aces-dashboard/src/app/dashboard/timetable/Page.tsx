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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <div className="flex items-center space-x-4">
            <h1
              className="text-2xl lg:text-3xl font-bold tracking-tight"
              style={{ color: "#166D86" }}
            >
              Timetable
            </h1>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 px-3 py-1 rounded-full shadow-sm border border-blue-100/50">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#166D86" }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {filteredTimetable.length} scheduled courses
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
                placeholder="Search courses..."
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
              onClick={fetchTimetableData}
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

            {/* Add Timetable Button */}
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
              <span>Add Schedule</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Filter by:
            </span>

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
        </div>

        {/* Timetable Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div
            className="px-8 py-4 border-b border-gray-100"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-6">
                <div className="min-w-[150px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Lecture Time
                </div>
                <div className="min-w-[120px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Course Code
                </div>
                <div className="min-w-[250px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Course Title
                </div>
                <div className="min-w-[100px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Day
                </div>
                <div className="min-w-[80px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Level
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
                    Loading timetable...
                  </span>
                </div>
              </div>
            ) : filteredTimetable.length === 0 ? (
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
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No courses scheduled
                </h3>
                <p className="mt-2 text-gray-500">
                  No timetable entries found for {selectedLevel} on{" "}
                  {selectedDay}
                </p>
              </div>
            ) : (
              filteredTimetable.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white px-8 py-4 hover:bg-gray-50 transition-colors duration-200 group rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-6">
                      {/* Lecture Time */}
                      <div className="min-w-[150px]">
                        <div className="flex items-center space-x-2">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "#2F327D" }}
                          >
                            {item.days[0]?.startTime} - {item.days[0]?.endTime}
                          </span>
                        </div>
                      </div>

                      {/* Course Code */}
                      <div className="min-w-[120px]">
                        <span
                          className="text-sm font-bold px-2 py-1 rounded-md"
                          style={{
                            color: "#166D86",
                            backgroundColor: "#f0f9ff",
                            border: "1px solid #e0f7fa",
                          }}
                        >
                          {item.courseCode}
                        </span>
                      </div>

                      {/* Course Title */}
                      <div className="min-w-[250px]">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2F327D" }}
                          title={item.courseTitle}
                        >
                          {item.courseTitle.length > 35
                            ? `${item.courseTitle.substring(0, 35)}...`
                            : item.courseTitle}
                        </span>
                      </div>

                      {/* Day */}
                      <div className="min-w-[100px]">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#166D86" }}
                          ></div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#2F327D" }}
                          >
                            {item.days[0]?.day}
                          </span>
                        </div>
                      </div>

                      {/* Level */}
                      <div className="min-w-[80px]">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#2F327D" }}
                        >
                          {item.level}
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
                        {item.status}
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
            Showing {filteredTimetable.length} courses for {selectedLevel} on{" "}
            {selectedDay}
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

      {/* Add Timetable Modal */}
      <AddTimetableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTimetable}
      />
    </div>
  );
}
