"use client"
import { useEffect, useState } from 'react';

export interface EventItem {
  id: string;
  title: string;
  Description?: string;
  imageUrl?: string;
  createdAt: string;
  dateOfEvent?: string;
  timeOfEvent?: string;
}

export function useEventItems() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      let allEntries: EventItem[] = [];
      let page = 1;
      let totalPages = 1;
      try {
        do {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event/read?page=${page}&limit=50`);
          const data = await res.json();
          const entries = data.entries || [];
          allEntries = allEntries.concat(entries);
          totalPages = data.pages || 1;
          page++;
        } while (page <= totalPages);
        const sorted = allEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setEvents(sorted.slice(0, 4));
      } catch (err: any) {
        setError(err.message || "Could not fetch events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return { events, loading, error };
}
