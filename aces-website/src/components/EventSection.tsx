"use client";
import Image from "next/image";
import Link from "next/link";
import { useEventItems, EventItem } from "../app/eventApi";
import { slugify } from '@/lib/slugify';

export default function EventSection() {
  const { events, loading, error } = useEventItems();

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!events || events.length === 0) return null;

  // latest event is featured, next three are grid events
  const featured: EventItem = events[0];
  const grid = events.slice(1, 4);

  const makeSlug = (s?: string) => slugify(s);

  return (
    <div className="flex flex-col items-center md:flex-row justify-center gap-10">
      <div className="flex flex-col gap-4 items-start w-[90%] md:w-1/3">
        <Image src={featured.imageUrl || "/laptop.png"} alt={featured.title || "Event image"} width={427} height={226} />
        <div className="text-[#166D86] text-xs font-semibold bg-[#98FF98] px-4 py-1 rounded-xl">EVENTS</div>
        <h3 className="text-2xl font-bold"><span className="text-[#0FACAC]">{featured.title}</span> Event</h3>
        <p className="text-sm">{featured.Description}</p>
  <Link href={`/blog/Event/${makeSlug(featured.title)}`} className="underline text-[#0facacbf] font-semibold">Read more</Link>
      </div>

      <div className="flex flex-col gap-5 w-[90%] md:w-1/3">
        {grid.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr 1fr 1fr 1fr] grid-rows-[1fr 1fr 1fr] gap-x-2 items-center justify-center">
            <Image src={item.imageUrl || "/default.jpg"} height={133.3} width={166.7} alt={item.title} className="col-start-1 col-end-3 row-start-1 row-end-4 w-[100%] h-[100%]" />
            <h4 className="col-start-3 col-end-5 row-start-1 row-end-2 text-2xl font-semibold">{item.title}</h4>
            <p className="col-start-3 col-end-5 row-start-2 row-end-3 text-xs">{item.Description}</p>
            <div className="col-start-3 col-end-4 row-start-3 row-end-4 font-bold bg-[#0facac40] text-xs text-center p-2 rounded-2xl text-[#166D86]">{item.date || new Date(item.createdAt).toLocaleDateString()}</div>
            <div className="col-start-4 col-end-5 row-start-3 row-end-4 font-bold border-1 border-[#2F327D] text-xs text-center p-2 rounded-2xl text-[#166D86]">{item.time || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
