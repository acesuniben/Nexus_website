"use client";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useEffect, useState } from "react"; // Only keep if both are used

interface Item {
  id: string;
  title: string;
  Description?: string;
  content?: string;
  imageUrl?: string;
  image?: string;
  createdAt: string;
}

export default function ItemDetailPage() {
  const { category, title } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Normalize category for API endpoint
  let apiCategory = category?.toString().trim().toLowerCase();
  if (apiCategory === 'mhs') apiCategory = 'acesmhs';
  if (apiCategory === 'news') apiCategory = 'blog';

  useEffect(() => {
    async function fetchItem() {
      setLoading(true);
      setError(null);
      let allEntries: Item[] = [];
      let page = 1;
      let totalPages = 1;
      try {
        do {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${apiCategory}/read?page=${page}&limit=50`);
          const data = await res.json();
          const entries = data.entries || [];
          allEntries = allEntries.concat(entries);
          totalPages = data.pages || 1;
          page++;
        } while (page <= totalPages);
        // Find the entry by title (trim and replace spaces with hyphens for matching)
        const normalizedTitle = title?.toString().trim();
        const found = allEntries.find(
          (entry: Item) => entry.title.trim().replace(/\s+/g, '-') === normalizedTitle
        );
        setItem(found || null);
      } catch {
        setError("Could not fetch item");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [apiCategory, title]);

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center py-10 min-h-screen">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {item && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-[#166D86] mb-2 text-left">{item.title}</h1>
            {/* Black line */}
            <hr className="border-black border mb-4" />
            {/* Date, blue dot, category */}
            <div className="flex items-center gap-3 mb-4 text-left">
              <span className="text-sm text-gray-600">Published at {new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="w-4 h-4 rounded-full bg-[#166D86] inline-block"></span>
              <span className="text-sm font-semibold text-[#166D86]">{category}</span>
            </div>
            {/* Image full width */}
            <div className="w-full flex justify-center mb-4">
              <Image src={item.imageUrl || item.image || "/default.jpg"} width={700} height={400} alt={item.title} className="object-cover w-full h-auto" />
            </div>
            {/* Text */}
            <div className="text-gray-700 text-lg whitespace-pre-line mb-4 text-left">{item.Description || item.content}</div>
            {/* Final black line */}
            <hr className="border-black border mt-4" />
          </div>
        )}
        {!loading && !error && !item && (
          <div className="text-gray-500">Item not found.</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
