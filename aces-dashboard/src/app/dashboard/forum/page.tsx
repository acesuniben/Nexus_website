import Image from "next/image";

const forumData = [
  {
    id: "#876364",
    title: "ACES Week",
    description: "Anticipate the ACES Week",
    date: "12 Dec, 2020",
    status: "Complete",
  },
  ...Array(8).fill({
    id: "#876364",
    title: "Happy Birthday Elijah",
    description: "Birthday Greetings",
    date: "15 Dec, 2025",
    status: "Complete",
  }),
];

export default function ForumPage() {
  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold" style={{ color: '#166D86' }}>Forum</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-opacity-50"
              style={{ '--tw-ring-color': '#166D86' } as React.CSSProperties}
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
          <button className="text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition font-semibold" style={{ backgroundColor: '#166D86' }}>+ Add New</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-2 font-medium"><input type="checkbox" /></th>
              <th className="py-3 px-2 font-medium">Forum ID</th>
              <th className="py-3 px-2 font-medium">Title</th>
              <th className="py-3 px-2 font-medium">Description</th>
              <th className="py-3 px-2 font-medium">Date</th>
              <th className="py-3 px-2 font-medium">Status</th>
              <th className="py-3 px-2 font-medium text-right"><span className="text-red-400">🗑️</span></th>
            </tr>
          </thead>
          <tbody>
            {forumData.map((item, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-4 px-2"><input type="checkbox" /></td>
                <td className="py-4 px-2 text-gray-700">{item.id}</td>
                <td className="py-4 px-2 text-gray-700">{item.title}</td>
                <td className="py-4 px-2 text-gray-700">{item.description}</td>
                <td className="py-4 px-2 text-gray-700 flex items-center gap-2"><span style={{ color: '#166D86' }}>📅</span> {item.date}</td>
                <td className="py-4 px-2">
                  <span className="px-6 py-2 rounded-full font-semibold text-sm" style={{ backgroundColor: '#F0F9FF', color: '#166D86' }}>{item.status}</span>
                </td>
                <td className="py-4 px-2 text-right"><button className="text-red-400 hover:text-red-600">🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
