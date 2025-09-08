"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useItems } from "./blog";
import { slugify } from '@/lib/slugify';
// ...existing code...


export default function BlogPage() {
  const { items, loading, error, hasMore, loadMore } = useItems();
  const latest = items[0];
  const rest = items.slice(1);

  return (
    <div className="">
      <Header />
      <main className="flex flex-col gap-10 md:gap-25 items-center mb-20">
        <section className="md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20">
          <h1 className="text-3xl md:text-5xl text-[#2F327D] font-bold">Association of Computer <br/>Engineering Students <span className="text-[#0FACAC] ">Blog</span></h1>
          <p className="w-[80%] mx-auto">Explore the latest news and information ACES have to offer</p>
        </section>

        {/* Latest Entry Featured Section */}
        {latest && (
          <section className="w-[90%] flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex items-center justify-center w-full md:w-1/2 max-h-[433px] bg-gray-100 rounded-xl overflow-hidden">
              <Image src={latest.image || "/default.jpg"} height={443} width={553} alt={latest.title} className="object-cover w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex gap-3 items-center mb-3">
                <div className="text-xs py-1 px-2 rounded-2xl bg-[#98FF98] text-[#166D86]">{latest.category}</div>
                <p>{new Date(latest.createdAt).toLocaleDateString()}</p>
              </div>
              <h2 className="text-2xl font-bold text-[#166D86]">{latest.title}</h2>
              <p className="text-gray-600 line-clamp-4">{latest.content.length > 220 ? latest.content.slice(0, 220) + '...' : latest.content}</p>
              <div className="mt-4">
                <Link href={`/blog/${latest.category}/${slugify(latest.title)}`} className="flex gap-2 items-center text-sm font-semibold text-[#0FACAC]" >
                  <Image src="/Icon.svg" alt="navigation arrow" width={30} height={30}/>
                  <p>Read More</p>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid for other entries */}
        <section className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-15">
          {loading && (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#166D86]"></div>
            </div>
          )}
          {error && (
            <div className="col-span-full text-red-500 text-center py-8">{error}</div>
          )}
          {!loading && !error && rest.slice(0, 24).map(item => (
            <div key={item.id} className="flex flex-col shadow-xl rounded-xl bg-white overflow-hidden min-h-[420px] max-h-[420px]">
              <div className="flex items-center justify-center  max-h-[255px] bg-gray-100 overflow-hidden">
                <Image src={item.image || "/default.jpg"} height={254.67} width={351.33} alt={item.title} className="object-cover w-full h-full rounded-t-xl" />
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div className="flex gap-2 items-center mb-2">
                  <div className="text-xs py-1 px-2 rounded-2xl bg-[#98FF98] text-[#166D86]">{item.category}</div>
                  <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <h2 className="text-base font-semibold text-[#166D86]">{item.title}</h2>
                <p className="text-gray-600 line-clamp-3">{item.content.length > 120 ? item.content.slice(0, 120) + '...' : item.content}</p>
                <div className="flex justify-end items-center mt-auto">
                  <Link href={`/blog/${item.category}/${slugify(item.title)}`} className="flex gap-2 items-center text-sm font-semibold text-[#0FACAC]" >
                    <Image src="/Icon.svg" alt="navigation arrow" width={30} height={30}/>
                    <p>Read More</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="flex justify-center items-center mt-6">
          <button
            onClick={loadMore}
            className={`bg-[#0FACAC] text-white py-3 px-6 rounded-full font-semibold transition-opacity duration-200 ${hasMore ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!hasMore}
          >
            {hasMore ? 'Load More' : 'No More Posts'}
          </button>
        </section>

        <section className="w-full flex justify-center items-center">
          <div className="relative w-[90%]">
            <Image src="/subscribe.svg" height={712.5} width={1525} alt="Newsletter sign-up background" className="w-full"/>
            <div className="absolute pt-1 top-[7.5%] md:top-[25%] left-[5%] md:left-[20%] flex flex-col gap-2 md:gap-6 items-center w-[90%] md:w-[60%]">
              <h2 className="text-[#2F327D] font-bold text-md md:text-3xl text-center w-[60%]">Register to stay up to date with <span className=" text-[#0FACAC]">ACES</span> Blog</h2>          
              <div className="bg-white text-sm md:text-lg rounded-4xl px-1 py-1 md:py-2 md:px-4 w-full md:w-[70%]">
                <form className="flex justify-between text-sm md:text-lg items-center w-full">
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    name="email"
                    className="text-xs md:text-lg px-1 py-0 md:px-2 md:py-1 w-focus:outline-none focus:ring-2 focus:ring-[#0FACAC] focus:border-transparent w-[80%]"
                    required
                  />
                  <button 
                    type="submit"
                    className="text-xs md:text-lg bg-[#166D86] text-white rounded-4xl p-1 md:py-2 md:px-4 hover:bg-[#0FACAC] transition-colors duration-200 font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}