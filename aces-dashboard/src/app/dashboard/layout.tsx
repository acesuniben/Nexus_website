import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Persistent Sidebar */}
      <Sidebar />
      
      {/* Main Content Area - This will re-render based on the page */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
