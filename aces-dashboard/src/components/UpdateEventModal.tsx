"use client";

import { useState, useEffect } from "react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  datePublished: string;
  dateOfEvent: string;
  timeOfEvent: string;
  status: string;
  imageUrl?: string;
}

interface UpdateEventForm {
  title: string;
  description: string;
  datePublished: string;
  dateOfEvent: string;
  timeOfEvent: string;
}

interface UpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onUpdate: (updatedEvent: EventItem) => void;
}

export default function UpdateEventModal({
  isOpen,
  onClose,
  event,
  onUpdate,
}: UpdateEventModalProps) {
  const [updateForm, setUpdateForm] = useState<UpdateEventForm>({
    title: event?.title || "",
    description: event?.description || "",
    datePublished: event?.datePublished || "",
    dateOfEvent: event?.dateOfEvent || "",
    timeOfEvent: event?.timeOfEvent || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when event prop changes
  useEffect(() => {
    if (event) {
      // Convert date strings to YYYY-MM-DD format for date inputs
      const formatDateForInput = (dateString: string) => {
        if (!dateString || dateString === "N/A") return "";

        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return dateString;
        }

        // Try to parse the formatted date (e.g., "March 1, 2025")
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split("T")[0];
        }

        return "";
      };

      setUpdateForm({
        title: event.title,
        description: event.description,
        datePublished: formatDateForInput(event.datePublished),
        dateOfEvent: formatDateForInput(event.dateOfEvent),
        timeOfEvent: event.timeOfEvent || "",
      });
    }
  }, [event]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleClose = () => {
    setUpdateForm({
      title: "",
      description: "",
      datePublished: "",
      dateOfEvent: "",
      timeOfEvent: "",
    });
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    // Validation
    if (!updateForm.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!updateForm.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!updateForm.datePublished.trim()) {
      setError("Publication date is required");
      return;
    }

    if (!updateForm.dateOfEvent.trim()) {
      setError("Event date is required");
      return;
    }

    if (!updateForm.timeOfEvent.trim()) {
      setError("Event time is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("You must be logged in as an admin");
      }

      // Convert datePublished and dateOfEvent to the format expected by API if needed
      const formattedDatePublished = updateForm.datePublished.includes("/")
        ? new Date(updateForm.datePublished).toISOString().split("T")[0]
        : updateForm.datePublished;

      const formattedDateOfEvent = updateForm.dateOfEvent.includes("/")
        ? new Date(updateForm.dateOfEvent).toISOString().split("T")[0]
        : updateForm.dateOfEvent;

      const response = await fetch(
        `https://aces-utky.onrender.com/api/admin/event/update/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: updateForm.title.trim(),
            Description: updateForm.description.trim(),
            datePublished: formattedDatePublished,
            dateOfEvent: formattedDateOfEvent,
            timeOfEvent: updateForm.timeOfEvent.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update event");
      }

      const updatedEventData = await response.json();

      // Format dates for display (convert back to display format)
      const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }
        return dateString;
      };

      // Create updated event object with the same structure as the original
      const updatedEvent: EventItem = {
        ...event,
        title: updatedEventData.title || updateForm.title.trim(),
        description:
          updatedEventData.Description || updateForm.description.trim(),
        datePublished: formatDateForDisplay(
          updatedEventData.datePublished || formattedDatePublished
        ),
        dateOfEvent: formatDateForDisplay(
          updatedEventData.dateOfEvent || formattedDateOfEvent
        ),
        timeOfEvent:
          updatedEventData.timeOfEvent || updateForm.timeOfEvent.trim(),
      };

      onUpdate(updatedEvent);
      onClose();
    } catch (error: any) {
      console.error("Error updating event:", error);
      setError(error.message || "Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{ color: "#166D86" }}>
              Update Event
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              disabled={isLoading}
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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={updateForm.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter event title"
                required
                disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={updateForm.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200 resize-none"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter event description"
                required
                disabled={isLoading}
              />
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date
              </label>
              <input
                type="date"
                name="datePublished"
                value={updateForm.datePublished}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="dateOfEvent"
                value={updateForm.dateOfEvent}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Event Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Time
              </label>
              <input
                type="time"
                name="timeOfEvent"
                value={updateForm.timeOfEvent}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = "#166D86";
                  e.target.style.boxShadow = `0 0 0 3px ${"#166D86" + "20"}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !updateForm.title ||
                  !updateForm.description ||
                  !updateForm.datePublished ||
                  !updateForm.dateOfEvent ||
                  !updateForm.timeOfEvent
                }
                className="flex-1 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#166D86",
                }}
              >
                {isLoading ? "Updating..." : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
