export default function DashboardPage() {
  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold" style={{ color: '#166D86' }}>Dashboard</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Welcome to ACES Dashboard</h3>
        <p className="text-gray-600">This is the main dashboard page. Navigate using the sidebar to access different sections.</p>
      </div>
    </div>
  );
}
