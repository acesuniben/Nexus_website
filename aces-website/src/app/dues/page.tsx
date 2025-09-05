import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DuesPage() {

    return (
        <div className="">
            <Header />
            <main className="flex flex-col gap-10 md:gap-25 items-center mb-20">
            <section className="md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20">
                <h1 className="text-3xl md:text-5xl text-[#2F327D] font-bold">Pay Your <span className="text-[#0FACAC] ">Departmental Dues</span></h1>
                <p className="w-[80%] mx-auto">It is very important to pay your departmental dues. Follow the steps below to complete your payment successfully</p>
            </section>

            {/* About Department Section */}
                    <section className="py-8 md:py-16 bg-white w-full">
                      <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 max-w-6xl mx-auto">
                          <div className="w-full md:w-1/2">
                            <Image
                              src="/confident.png"
                              alt="Students in classroom"
                              width={500}
                              height={400}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <div className="relative mb-6">
                              {/* Background image */}
                              <Image
                                src="/about-header.png"
                                alt="About Department Header Background"
                                width={400}
                                height={120}
                                className="w-full h-auto"
                              />
                              {/* Header content overlay */}
                              <div className="absolute inset-0 flex items-start pt-2 md:pt-4 gap-2 px-2 md:px-4">
                                <h2 className="text-xl md:text-4xl font-bold text-[#2F327D]">
                                  Pay Your <span className="text-[#0FACAC]"> ACES Dues</span>
                                </h2>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                              To improve the department and to ensure activities like Fresher’s Welcome, HOD’s Cup, Tech Week, hackathons etc are successfully achieved, paying your departmental dues is very important.
                            </p>
                            <Image src='/Arrow.png' alt="Arrow Icon" width={84} height={67} />
                            <p>Paying your dues shows not only your commitment to the department but also your pride in belonging to it. It is a way of investing in yourself, your colleagues, and the legacy of the department. Together, with your contribution, we can achieve more and make the department better for everyone.</p>
                          </div>
                        </div>
                      </div>
                    </section>

            </main>
            <Footer />
        </div>
    );  
}