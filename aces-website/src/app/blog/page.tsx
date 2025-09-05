import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function BlogPage() {
  return (
    <div className="">
        <Header />
        <main className="flex flex-col gap-10 md:gap-25 items-center mb-20">
          <section className="md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20">
            <h1 className="text-3xl md:text-5xl text-[#2F327D] font-bold">Association of Computer <br/>Engineering Students <span className="text-[#0FACAC] ">Blog</span></h1>
            <p className="w-[80%] mx-auto">Explore the latest news and information ACES have to offer</p>
          </section>

          {/* <section className="w-[90%] flex flex-col md:flex-row gap-10 md:gap-20">
            <div><Image src={} height={} width={} alt={} className="rounded-xl"></Image></div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center mb-3">
                    <div className="text-xs py-1 px-2 rounded-2xl bg-[#98FF98] text-[#166D86]"></div>
                    <p></p>
                </div>
                <h2></h2>
                <p></p>
                <Link href="" className="flex gap-2 items-center text-sm font-semibold" ><Image src="Icon.svg" alt="navigation arrow" width={30} height={30}/> <p>Read More</p></Link>
            </div>
          </section>
          
          <section className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20"> */}
            {/* Map through blog posts here */}
            {/* {blogs.slice(0, 6).map(blog => (
              <div key={blog.title} className="flex flex-col gap-3 shadow-xl">
                <div><Image src={blog.image} height={300} width={400} alt={blog.title} className="rounded-t-xl"></Image></div>
                <div className="flex gap-3 items-center mb-3">
                    <div className="text-xs py-1 px-2 rounded-2xl bg-[#98FF98] text-[#166D86]"></div>
                    <h2></h2>
                    <p></p>
                    <div className = "flex justify-between items-center">
                        <p>{blog.date}</p>
                        <Link href={blog.link} className="flex gap-2 items-center text-sm font-semibold" ><Image src="Icon.svg" alt="navigation arrow" width={30} height={30}/> <p>Read More</p></Link>
                    </div>
                </div>
                )
                )}
          </section>

          <section className="flex justify-center items-center">
            <button className="bg-[#0FACAC] text-white py-3 px-6 rounded-full font-semibold">Load More</button>
          </section> */}
        </main>
        <Footer />
    </div>
)
}