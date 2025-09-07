"use client";

import { useState } from "react";

interface AddTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TimetableFormData) => void;
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

// Additional fields for form input
interface FormInputData {
  courseCode: string;
  courseTitle: string;
  level: string;
  semester: string;
  creditUnit: string;
  session: string;
  day: string;
  startTime: string;
  endTime: string;
  lecturer: string;
}

export default function AddTimetableModal({
  isOpen,
  onClose,
  onSubmit,
}: AddTimetableModalProps) {
  const [formData, setFormData] = useState<FormInputData>({
    courseCode: "",
    courseTitle: "",
    level: "300L",
    semester: "First Semester",
    creditUnit: "3",
    session: "2024/2025",
    day: "Monday",
    startTime: "",
    endTime: "",
    lecturer: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormInputData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation with user feedback
    if (
      !formData.courseCode ||
      !formData.courseTitle ||
      !formData.level ||
      !formData.day ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert(
        "Please fill in all required fields: Course Code, Course Title, Level, Day, Start Time, and End Time."
      );
      return;
    }

    setIsLoading(true);
    try {
      // Convert form data to expected timetable format
      const submitData: TimetableFormData = {
        courseTitle: formData.courseTitle,
        courseCode: formData.courseCode,
        level: formData.level,
        session: formData.session,
        semester: formData.semester,
        creditUnits: parseInt(formData.creditUnit) || 3,
        days: [
          {
            day: formData.day,
            startTime: formData.startTime,
            endTime: formData.endTime,
          },
        ],
        lecturers: formData.lecturer ? [formData.lecturer] : [],
      };

      console.log("Submitting timetable data:", submitData);
      await onSubmit(submitData);

      // Reset form
      setFormData({
        courseCode: "",
        courseTitle: "",
        level: "300L",
        semester: "First Semester",
        creditUnit: "3",
        session: "2024/2025",
        day: "Monday",
        startTime: "",
        endTime: "",
        lecturer: "",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting timetable:", error);
      alert(
        "An error occurred while adding the timetable entry. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      courseCode: "",
      courseTitle: "",
      level: "300L",
      semester: "First Semester",
      creditUnit: "3",
      session: "2024/2025",
      day: "Monday",
      startTime: "",
      endTime: "",
      lecturer: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  // Generate summary entries for preview
  const summaryEntries = [];
  if (formData.courseCode && formData.startTime && formData.endTime) {
    summaryEntries.push({
      day: formData.day || "Monday",
      code: formData.courseCode,
      time: `${formData.startTime} - ${formData.endTime}`,
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left Panel - Form */}
          <div className="flex-1 p-6 border-r border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-xl font-semibold"
                style={{ color: "#166D86" }}
              >
                Add Timetable
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

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* General Time Table Section */}
                <div>
                  <h3
                    className="text-lg font-medium mb-4"
                    style={{ color: "#166D86" }}
                  >
                    General Time Table
                  </h3>

                  {/* Course Code and Course Title Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course code
                      </label>
                      <input
                        type="text"
                        value={formData.courseCode}
                        onChange={(e) =>
                          handleInputChange("courseCode", e.target.value)
                        }
                        placeholder="CPE 362"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title
                      </label>
                      <input
                        type="text"
                        value={formData.courseTitle}
                        onChange={(e) =>
                          handleInputChange("courseTitle", e.target.value)
                        }
                        placeholder="Software Engineering II"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Level and Semester Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) =>
                          handleInputChange("level", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      >
                        <option value="100L">100L</option>
                        <option value="200L">200L</option>
                        <option value="300L">300L</option>
                        <option value="400L">400L</option>
                        <option value="500L">500L</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Semester
                      </label>
                      <select
                        value={formData.semester}
                        onChange={(e) =>
                          handleInputChange("semester", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="First Semester">First Semester</option>
                        <option value="Second Semester">Second Semester</option>
                      </select>
                    </div>
                  </div>

                  {/* Credit Unit and Session Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credit Unit
                      </label>
                      <select
                        value={formData.creditUnit}
                        onChange={(e) =>
                          handleInputChange("creditUnit", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.session}
                          onChange={(e) =>
                            handleInputChange("session", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 bg-green-100"
                          onFocus={(e) => {
                            e.target.style.borderColor = "#166D86";
                            e.target.style.boxShadow = `0 0 0 3px ${
                              "#166D86" + "20"
                            }`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day
                    </label>
                    <select
                      value={formData.day}
                      onChange={(e) => handleInputChange("day", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white font-medium"
                      style={{ backgroundColor: "#166D86" }}
                      required
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>

                  {/* Start Time and End Time Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          handleInputChange("endTime", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Lecturer */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lecturer
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.lecturer}
                        onChange={(e) =>
                          handleInputChange("lecturer", e.target.value)
                        }
                        placeholder="Eng. Dr. Isi"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Prof Apeh"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#166D86";
                          e.target.style.boxShadow = `0 0 0 3px ${
                            "#166D86" + "20"
                          }`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Add Course Button */}
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.courseCode ||
                      !formData.courseTitle ||
                      !formData.level ||
                      !formData.day ||
                      !formData.startTime ||
                      !formData.endTime
                    }
                    className="w-full py-2 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                    style={{
                      backgroundColor: "#166D86",
                    }}
                  >
                    {isLoading ? "Adding..." : "+ Add Course"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Panel - Summary */}
          <div className="w-80 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium" style={{ color: "#166D86" }}>
                Summary
              </h3>
              <button
                className="px-3 py-1 text-white text-sm rounded-full"
                style={{ backgroundColor: "#166D86" }}
              >
                First Semester
              </button>
            </div>

            {/* Summary Table Headers */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-sm font-medium text-gray-600">
              <div>Day</div>
              <div>Code</div>
              <div>Title</div>
            </div>

            {/* Summary Entries */}
            <div className="space-y-2">
              {summaryEntries.length > 0 ? (
                summaryEntries.map((entry, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-900">{entry.day}</div>
                    <div className="text-blue-600 font-medium">
                      {entry.code}
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span className="text-gray-900">{entry.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-900">Monday</div>
                    <div className="text-blue-600 font-medium">CPE 362</div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span className="text-gray-900">9:00 am - 10:00 am</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-900">Wednesday</div>
                    <div className="text-blue-600 font-medium">CPE 362</div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span className="text-gray-900">9:00 am - 10:00 am</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
