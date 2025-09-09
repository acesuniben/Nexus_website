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
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Left Panel - Form */}
          <div className="flex-1 p-8 border-r border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Timetable
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
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

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[calc(90vh-200px)]"
            >
              <div className="space-y-8">
                {/* General Time Table Section */}
                <div>
                  <h3
                    className="text-xl font-semibold mb-6"
                    style={{ color: "#166D86" }}
                  >
                    General Time Table
                  </h3>

                  {/* Course Code and Course Title Row */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Course code
                      </label>
                      <input
                        type="text"
                        value={formData.courseCode}
                        onChange={(e) =>
                          handleInputChange("courseCode", e.target.value)
                        }
                        placeholder="CPE 362"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Course Title
                      </label>
                      <input
                        type="text"
                        value={formData.courseTitle}
                        onChange={(e) =>
                          handleInputChange("courseTitle", e.target.value)
                        }
                        placeholder="Software Engineering II"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Level
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) =>
                          handleInputChange("level", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none transition-all duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Semester
                      </label>
                      <select
                        value={formData.semester}
                        onChange={(e) =>
                          handleInputChange("semester", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none transition-all duration-200"
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
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Credit Unit
                      </label>
                      <select
                        value={formData.creditUnit}
                        onChange={(e) =>
                          handleInputChange("creditUnit", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 appearance-none transition-all duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Session
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.session}
                          onChange={(e) =>
                            handleInputChange("session", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 bg-green-50 transition-all duration-200"
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
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Day
                    </label>
                    <select
                      value={formData.day}
                      onChange={(e) => handleInputChange("day", e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-white font-medium transition-all duration-200"
                      style={{
                        backgroundColor: "#166D86",
                        borderColor: "#166D86",
                      }}
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
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Start time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        End time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          handleInputChange("endTime", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Lecturer
                    </label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData.lecturer}
                        onChange={(e) =>
                          handleInputChange("lecturer", e.target.value)
                        }
                        placeholder="Eng. Dr. Isi"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
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
                    className="w-full py-4 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: "#166D86",
                    }}
                  >
                    {isLoading ? "Adding Course..." : "+ Add Course"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Panel - Summary */}
          <div className="w-96 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3
                className="text-xl font-semibold"
                style={{ color: "#166D86" }}
              >
                Summary
              </h3>
              <button
                className="px-4 py-2 text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200"
                style={{ backgroundColor: "#166D86" }}
              >
                First Semester
              </button>
            </div>

            {/* Summary Table Headers */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-semibold text-gray-600 border-b border-gray-200 pb-3">
              <div>Day ↓</div>
              <div>Code ↓</div>
              <div>Title ↓</div>
            </div>

            {/* Summary Entries */}
            <div className="space-y-3">
              {summaryEntries.length > 0 ? (
                summaryEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 text-sm py-3 px-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="text-gray-900 font-medium">{entry.day}</div>
                    <div className="font-semibold" style={{ color: "#166D86" }}>
                      {entry.code}
                    </div>
                    <div className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: "#166D86" }}
                      ></span>
                      <span className="text-gray-900 text-xs">
                        {entry.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm py-3 px-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-900 font-medium">Monday</div>
                    <div className="font-semibold" style={{ color: "#166D86" }}>
                      CPE 362
                    </div>
                    <div className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: "#166D86" }}
                      ></span>
                      <span className="text-gray-900 text-xs">
                        9:00 am - 10:00 am
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm py-3 px-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-900 font-medium">Wednesday</div>
                    <div className="font-semibold" style={{ color: "#166D86" }}>
                      CPE 362
                    </div>
                    <div className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: "#166D86" }}
                      ></span>
                      <span className="text-gray-900 text-xs">
                        9:00 am - 10:00 am
                      </span>
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
