"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Mock data - replace with actual API call
  const mockStudents: Student[] = [
    {
      id: "1",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "2",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "3",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "4",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "5",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "6",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "7",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "8",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
    {
      id: "9",
      matriculationNumber: "ENG20/08/76",
      fullName: "Oghosa Vick",
      email: "aromeatguat@gmail.com",
      dateOfBirth: "2000-12-12",
      level: "300L",
      status: "Registered",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matriculationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/students",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err: any) {
      setError(err.message);
      // Fallback to mock data
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
              Students
            </h1>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 px-3 py-1 rounded-full shadow-sm border border-blue-100/50">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#166D86" }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {filteredStudents.length} students
              </span>
            </div>
          </div>

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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div
            className="px-6 py-4 border-b border-gray-100"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="grid grid-cols-6 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <div>Mat No.</div>
              <div>Name</div>
              <div>Email</div>
              <div>Date</div>
              <div>Level</div>
              <div>Status</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
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
                    Loading students...
                  </span>
                </div>
              </div>
            ) : filteredStudents.length === 0 ? (
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No students found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search terms.
                </p>
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="grid grid-cols-6 gap-4 items-center">
                    {/* Mat No */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: "#166D86" }}
                        >
                          {student.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {student.matriculationNumber}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {student.fullName}
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <span
                        className="text-sm font-medium hover:underline cursor-pointer"
                        style={{ color: "#166D86" }}
                      >
                        {student.email}
                      </span>
                    </div>

                    {/* Date */}
                    <div>
                      <span className="text-sm text-gray-600">
                        {formatDate(student.dateOfBirth)}
                      </span>
                    </div>

                    {/* Level */}
                    <div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#166D86" }}
                      >
                        {student.level}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {student.status}
                      </span>

                      {/* Actions Menu */}
                      <button
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all duration-200 hover:bg-gray-100"
                        style={{ color: "#166D86" }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination - Optional */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
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
    </div>
  );
}
