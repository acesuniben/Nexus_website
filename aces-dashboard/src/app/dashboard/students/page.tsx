"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import UpdateStudentModal from "@/components/UpdateStudentModal";

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

interface PaginationInfo {
  total: number;
  page: number;
  pages: number;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    // Fetch students on component mount and when page changes
    fetchStudents(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // If search term is empty, show all students from the current page
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
      return;
    }

    // Check if search term looks like a student ID (you can adjust this logic)
    const isSearchingById =
      searchTerm.length > 3 &&
      !searchTerm.includes("@") &&
      !searchTerm.includes(" ");

    if (isSearchingById) {
      // Use API to search by ID
      const timeoutId = setTimeout(() => {
        fetchStudentById(searchTerm);
      }, 500); // Debounce for 500ms

      return () => clearTimeout(timeoutId);
    } else {
      // Use local filtering for name, matriculation number, and email
      const filtered = students.filter(
        (student) =>
          student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.matriculationNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest(".relative")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const fetchStudents = async (page: number = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/students/read?page=${page}",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();
      console.log("Fetched students:", data);

      // Handle different response structures
      const studentsArray = Array.isArray(data)
        ? data
        : data.students || data.data || [];
      setStudents(studentsArray);
      setFilteredStudents(studentsArray);

      // Set pagination info from backend response
      setPaginationInfo({
        total: data.total || studentsArray.length,
        page: data.page || page,
        pages: data.pages || 1,
      });
    } catch (err: any) {
      console.error("Error fetching students:", err);
      setError(err.message);
      // Clear students data on any error
      setStudents([]);
      setFilteredStudents([]);
      setPaginationInfo({ total: 0, page: 1, pages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentById = async (studentId: string) => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      const response = await fetch(
        `https://aces-utky.onrender.com/api/admin/students/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch student");
      }

      const data = await response.json();
      console.log("Fetched student by ID:", data);

      // Handle different response structures
      const student = data.student || data.data || data;
      if (student) {
        setFilteredStudents([student]);
      } else {
        setFilteredStudents([]);
      }
    } catch (err: any) {
      console.error("Error fetching student by ID:", err);
      setError(err.message);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= paginationInfo.pages) {
      setCurrentPage(newPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < paginationInfo.pages) {
      handlePageChange(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpdateStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setEditingStudent(student);
      setIsUpdateModalOpen(true);
    }
    setActiveDropdown(null);
  };

  const handleStudentUpdated = async (updatedStudent: Student) => {
    // Refresh the students list after update
    await fetchStudents();
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          throw new Error("You must be logged in as an admin");
        }

        const response = await fetch(
          `https://aces-utky.onrender.com/api/admin/students/delete/${studentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete student");
        }

        // Refresh the students list
        await fetchStudents();
        console.log("Student deleted successfully");
      } catch (err: any) {
        console.error("Error deleting student:", err);
        setError(err.message);
      }
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (studentId: string) => {
    setActiveDropdown(activeDropdown === studentId ? null : studentId);
  };

  // Generate page numbers for pagination display
  const getVisiblePageNumbers = () => {
    const { page, pages } = paginationInfo;
    const maxVisiblePages = 5;
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(pages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate the range of students being displayed
  const getDisplayRange = () => {
    if (filteredStudents.length === 0) return { start: 0, end: 0 };

    // If we're searching and showing filtered results
    if (searchTerm.trim()) {
      return { start: 1, end: filteredStudents.length };
    }

    // For paginated results
    const studentsPerPage =
      Math.ceil(paginationInfo.total / paginationInfo.pages) || 20;
    const start = (currentPage - 1) * studentsPerPage + 1;
    const end = Math.min(currentPage * studentsPerPage, paginationInfo.total);

    return { start, end };
  };

  const displayRange = getDisplayRange();

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
                {searchTerm.trim()
                  ? filteredStudents.length
                  : paginationInfo.total}{" "}
                students
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
                placeholder="Search by name, email, matric no., or ID..."
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

            {/* Refresh Button */}
            <button
              onClick={() => fetchStudents(currentPage)}
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
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div
            className="px-8 py-4 border-b border-gray-100"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-6">
                <div className="min-w-[120px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Mat No.
                </div>
                <div className="min-w-[150px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Name
                </div>
                <div className="min-w-[200px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </div>
                <div className="min-w-[120px] text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date of Birth
                </div>
                <div className="min-w-[60px] text-xs font-bold text-gray-600 uppercase tracking-wider">
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
                  {searchTerm.trim()
                    ? "Try adjusting your search terms."
                    : "No students available at the moment."}
                </p>
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="bg-white px-8 py-4 hover:bg-gray-50 transition-colors duration-200 group rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-6">
                      {/* Mat No */}
                      <div className="min-w-[120px]">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2F327D" }}
                        >
                          {student.matriculationNumber}
                        </span>
                      </div>

                      {/* Name */}
                      <div className="min-w-[150px]">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2F327D" }}
                        >
                          {student.fullName}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-2 min-w-[200px]">
                        <Image
                          src="/emailIcon.png"
                          alt="Email"
                          width={16}
                          height={16}
                          className="flex-shrink-0"
                        />
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "#2F327D" }}
                          title={student.email}
                        >
                          {student.email}
                        </span>
                      </div>

                      {/* Date of Birth*/}
                      <div className="flex items-center space-x-2 min-w-[120px]">
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
                          {formatDate(student.dateOfBirth)}
                        </span>
                      </div>

                      {/* Level */}
                      <div className="min-w-[60px]">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#2F327D" }}
                        >
                          {student.level}
                        </span>
                      </div>
                    </div>

                    {/* Right side - Status and Actions */}
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
                        Registered
                      </span>

                      {/* Actions Menu */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(student.id)}
                          className="p-1 rounded-lg transition-all duration-200 hover:bg-gray-100"
                          style={{ color: "#2F327D" }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === student.id && (
                          <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-15">
                            <button
                              onClick={() => handleUpdateStudent(student.id)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-3"
                              style={{ color: "#2F327D" }}
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <span className="font-medium">Update</span>
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span className="font-medium">Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
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
            {searchTerm.trim()
              ? `Showing ${filteredStudents.length} search results`
              : `Showing ${displayRange.start}-${displayRange.end} of ${paginationInfo.total} students`}
          </div>

          {/* Only show pagination controls when not searching */}
          {!searchTerm.trim() && paginationInfo.pages > 1 && (
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {getVisiblePageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isLoading}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pageNum === currentPage
                      ? "text-white"
                      : "text-gray-500 bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                  style={
                    pageNum === currentPage
                      ? { backgroundColor: "#166D86" }
                      : {}
                  }
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentPage === paginationInfo.pages || isLoading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Student Modal */}
      <UpdateStudentModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        student={editingStudent}
        onUpdate={handleStudentUpdated}
      />
    </div>
  );
}
