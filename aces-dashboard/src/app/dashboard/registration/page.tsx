"use client";

import { useState } from "react";
import Image from "next/image";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    matriculationNumber: "",
    stateOfOrigin: "",
    level: "",
    universityEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Format the data according to the API schema
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        matriculationNumber: formData.matriculationNumber,
        level: formData.level, // Ensure it has 'L' after the number
        phoneNumber: formData.phoneNumber,
        stateOfOrigin: formData.stateOfOrigin,
        universityEmail: formData.universityEmail,
      };

      console.log("Sending registration data:", registrationData);

      // Get the admin token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error(
          "You must be logged in as an admin to register students"
        );
      }

      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/students/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      setSuccess(true);

      // Reset form after successful registration
      setFormData({
        fullName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
        matriculationNumber: "",
        stateOfOrigin: "",
        level: "",
        universityEmail: "",
        password: "",
        confirmPassword: "",
      });
      setProfileImage(null);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const levels = ["100L", "200L", "300L", "400L", "500L"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <h1
            className="text-2xl lg:text-3xl font-bold tracking-tight"
            style={{ color: "#166D86" }}
          >
            Registration
          </h1>
          <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm border">
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-green-800 font-medium">
                  Student registered successfully!
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center lg:w-1/3 xl:w-1/4">
              <div className="relative mb-6">
                <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-white shadow-2xl">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, #166D86, #1a7fa3)`,
                      }}
                    >
                      <span className="text-white text-3xl lg:text-4xl font-bold drop-shadow-lg">
                        {formData.fullName
                          ? formData.fullName.charAt(0).toUpperCase()
                          : "?"}
                      </span>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-2 right-2 text-white rounded-full p-3 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, #166D86, #1a7fa3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, #124f63, #166D86)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, #166D86, #1a7fa3)`;
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                      fill="currentColor"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 text-center max-w-xs">
                Click the edit button to upload your profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Full Name */}
                <div className="group">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:transition-colors"
                    style={
                      { "--focus-color": "#166D86" } as React.CSSProperties
                    }
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900"
                    style={
                      {
                        "--tw-ring-color": "#166D86",
                      } as React.CSSProperties
                    }
                    onFocus={(e) => {
                      e.target.style.borderColor = "#166D86";
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(22, 109, 134, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Password (Auto Generated) */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Password (Auto Generated)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="password"
                      value="••••••••••"
                      readOnly
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:transition-colors">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 placeholder-gray-400 text-gray-900"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#166D86";
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(22, 109, 134, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Confirm Password (Auto Generated) */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Confirm Password (Auto Generated)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="confirmPassword"
                      value="••••••••••"
                      readOnly
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F0F9FF" }}
                      >
                        <svg
                          className="w-4 h-4"
                          style={{ color: "#166D86" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 text-gray-900"
                    max={new Date().toISOString().split("T")[0]} // Prevents future dates
                    min="1970-01-01" // Reasonable minimum date
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Matriculation Number */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    Matriculation Number
                  </label>
                  <input
                    type="text"
                    name="matriculationNumber"
                    value={formData.matriculationNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                    placeholder="Enter your matriculation number"
                    required
                  />
                </div>

                {/* State of Origin */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    State of Origin
                  </label>
                  <select
                    name="stateOfOrigin"
                    value={formData.stateOfOrigin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 text-gray-700"
                    required
                  >
                    <option value="" className="text-gray-400">
                      Select your state of origin
                    </option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 text-gray-700"
                    required
                  >
                    <option value="" className="text-gray-400">
                      Select your level
                    </option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-teal-600 transition-colors">
                    University Email
                  </label>
                  <input
                    type="email"
                    name="universityEmail"
                    value={formData.universityEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                    placeholder="Enter your university email"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-10 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white font-semibold py-4 px-12 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4"
                  style={
                    {
                      backgroundColor: "#166D86",
                      "--tw-ring-color": "rgba(22, 109, 134, 0.2)",
                    } as React.CSSProperties
                  }
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
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
