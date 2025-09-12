"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "/SidebarDashboardIcon.png",
      href: "/dashboard",
    },
    {
      name: "Registration",
      icon: "/sidebarRegistration.png",
      href: "/dashboard/registration",
    },
    { name: "MHS", icon: "/sidebarMHS.png", href: "/dashboard/mhs" },
    { name: "Forum", icon: "/sidebarForum.png", href: "/dashboard/forum" },
    {
      name: "Events",
      icon: "/sidebarTimetable.png",
      href: "/dashboard/events",
    },
    {
      name: "Timetable",
      icon: "/sidebarTimetable.png",
      href: "/dashboard/timetable",
    },
    {
      name: "Blog",
      icon: "/sidebarBloganStudents.png",
      href: "/dashboard/blog",
    },
    {
      name: "Students",
      icon: "/sidebarBloganStudents.png",
      href: "/dashboard/students",
    },
  ];

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (!confirmLogout) return;
      const token = localStorage.getItem("adminToken");
      try {
        await fetch("https://aces-utky.onrender.com/api/admin/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (err) {
        // Optionally handle error (e.g., show notification)
      }
      localStorage.removeItem("adminToken");
      window.location.href = "/"; // Redirect to login or home page
    }
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col py-8 px-6">
      <div className="flex items-center mb-10">
        <Image
          src="/logo.png"
          alt="ACES Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="font-bold text-lg" style={{ color: "#166D86" }}>
          ACES
        </span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4 text-gray-500">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "font-semibold shadow-sm"
                      : "hover:bg-gray-50 hover:shadow-sm hover:scale-[1.02]"
                  }`}
                  style={{
                    color: isActive ? "#166D86" : "#6B7280",
                    backgroundColor: isActive ? "#F0F9FF" : "transparent",
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    width={20}
                    height={20}
                    className={`mr-3 transition-transform duration-200 ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`transition-colors duration-200 ${
                      isActive ? "" : "group-hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-8 flex items-center justify-center px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
          />
        </svg>
        Logout
      </button>
    </aside>
  );
}
