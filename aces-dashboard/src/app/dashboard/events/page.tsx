"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddEventModal from "@/components/AddEventModal";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  imageUrl?: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  image?: File;
}

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from API
  const fetchEvents = async () => {
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

      console.log("Token found, fetching events...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/event/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const eventsData = await response.json();
        console.log("Events data received:", eventsData);

        // Handle the response structure with entries array
        let eventsArray = [];
        if (
          eventsData &&
          eventsData.entries &&
          Array.isArray(eventsData.entries)
        ) {
          eventsArray = eventsData.entries;
          console.log(`Found ${eventsArray.length} events`);
        } else {
          console.error("Expected entries array but received:", eventsData);
          setEvents([]);
          setIsLoading(false);
          return;
        }

        // Map the API response to match our EventItem interface
        const mappedEvents: EventItem[] = eventsArray.map((event: any) => ({
          id: event.id || `#${Math.random().toString(36).substr(2, 6)}`,
          title: event.title,
          description: event.Description || event.description,
          date: event.datePublished
            ? new Date(event.datePublished).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          status: "Upcoming", // Default status
          imageUrl: event.imageUrl,
        }));
        setEvents(mappedEvents);
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch events:", response.statusText);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 100); // Small delay to ensure localStorage is available

    return () => clearTimeout(timer);
  }, []);

  const handleAddEvent = async (formData: EventFormData) => {
    try {
      let imageUrl = "";

      // Upload image first if provided
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.image);
        imageFormData.append("upload_preset", "your-upload-preset"); // You'll need to configure this in Cloudinary

        const imageResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dcldvsih8/image/upload",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.secure_url;
        }
      }

      // Get token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      // Create Event post
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/event/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            Description: formData.description, // Note: capital 'D' as per schema
            datePublished: formData.date,
            imageUrl: imageUrl,
          }),
        }
      );

      if (response.ok) {
        const newEventData = await response.json();
        console.log("Event created successfully:", newEventData);

        // Refetch events to get the latest data from server
        await fetchEvents();
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else if (response.status === 403) {
        // Insufficient permissions
        alert("You don't have permission to create events.");
      } else {
        const errorData = await response.json();
        console.error("Failed to create event:", errorData);
        alert(
          `Failed to create event: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#166D86" }}>
            Events
          </h1>
          <p className="text-gray-600">Manage ACES events and activities</p>
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
            + Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading events...</div>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-3 px-2 font-medium">
                  <input type="checkbox" className="mr-2" />
                  Event Ref
                </th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-900 font-medium text-sm">
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{event.title}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600 truncate max-w-xs block">
                        {event.description}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        <span className="text-gray-900">{event.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: "#166D86" }}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-red-500 hover:text-red-700 transition">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  );
}
