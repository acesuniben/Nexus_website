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
    </aside>
  );
}
