"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "🏠", href: "/dashboard" },
    { name: "Registration", icon: "📝", href: "/dashboard/registration" },
    { name: "MHS", icon: "🧠", href: "/dashboard/mhs" },
    { name: "Forum", icon: "💬", href: "/dashboard/forum" },
    { name: "Events", icon: "🎉", href: "/dashboard/events" },
    { name: "Timetable", icon: "📅", href: "/dashboard/timetable" },
    { name: "Blog", icon: "📰", href: "/dashboard/blog" },
    { name: "Students", icon: "👨‍🎓", href: "/dashboard/students" },
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
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${
                    isActive ? "font-semibold" : "hover:bg-gray-50"
                  }`}
                  style={{
                    color: isActive ? "#166D86" : "#6B7280",
                    backgroundColor: isActive ? "#F0F9FF" : "transparent",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
