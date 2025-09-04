import Image from "next/image";

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = "Dashboard" }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: "🏠", href: "/" },
    { name: "Registration", icon: "📝", href: "/registration" },
    { name: "MHS", icon: "🧠", href: "/mhs" },
    { name: "Forum", icon: "💬", href: "/forum" },
    { name: "Timetable", icon: "📅", href: "/timetable" },
    { name: "Blog", icon: "📰", href: "/blog" },
    { name: "Students", icon: "👨‍🎓", href: "/students" },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col py-8 px-6">
      <div className="flex items-center mb-10">
        <Image src="/logo.png" alt="ACES Logo" width={40} height={40} className="mr-2" />
        <span className="font-bold text-lg" style={{ color: '#166D86' }}>ACES</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4 text-gray-500">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${
                  activeItem === item.name
                    ? "font-semibold"
                    : "hover:bg-gray-50"
                }`}
                style={{
                  color: activeItem === item.name ? '#166D86' : '#6B7280',
                  backgroundColor: activeItem === item.name ? '#F0F9FF' : 'transparent'
                }}
              >
                <span>{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
