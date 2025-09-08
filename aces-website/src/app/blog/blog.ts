'use client';
import { useState, useEffect } from 'react'; // Only keep if both are used

interface Item {
  id: string;
  title: string;
  content: string;
  image?: string;
  category: string;
  createdAt: string;
  author?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAGE_LIMIT = parseInt(process.env.NEXT_PUBLIC_PAGE_LIMIT || '10', 10);

function buildUrl(base: string, path: string) {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

const endpoints = [
  { key: 'News', url: buildUrl(API_BASE_URL || '', 'blog/read') },
  { key: 'Events', url: buildUrl(API_BASE_URL || '', 'event/read') },
  { key: 'Forum', url: buildUrl(API_BASE_URL || '', 'forum/read') },
  { key: 'MHS', url: buildUrl(API_BASE_URL || '', 'acesmhs/read') },
];

async function fetchAllPages(endpoint: { key: string; url: string }): Promise<Item[]> {
  let page = 1;
  let allItems: Item[] = [];
  let totalPages = 1;

  do {
    const url = `${endpoint.url}?page=${page}&limit=${PAGE_LIMIT}`;
    const response = await fetch(url);
    if (!response.ok) break;
    const data = await response.json();

    if (!data.entries || data.entries.length === 0) break;

    const items: Item[] = data.entries.map((entry: any) => ({
      id: entry.id,
      title: entry.title,
      content: entry.Description || "",
      image: entry.imageUrl || "/default.jpg",
      category: endpoint.key,
      createdAt: entry.createdAt,
      author: "ACES Team",
    }));

    totalPages = data.pages || 1;
    allItems = allItems.concat(items);
    page++;
  } while (page <= totalPages);

  return allItems;
}

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_LIMIT);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        if (!API_BASE_URL) throw new Error('API Base URL not configured');
        const promises = endpoints.map(ep => fetchAllPages(ep));
        const allResults = await Promise.all(promises);
        let results = allResults.flat();
        // Shuffle for random order
        results = results.sort(() => Math.random() - 0.5);
        setItems(results);
        setVisibleCount(PAGE_LIMIT);
      } catch (err: any) {
        setError((err as Error).message || 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const loadMore = () => setVisibleCount((prev: number) => prev + PAGE_LIMIT);

  return {
    items: items.slice(0, visibleCount),
    loading,
    error,
    hasMore: visibleCount < items.length,
    loadMore,
  };
};