"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  const pathname = usePathname();
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Hardware Club", href: "/hardware" },
    { name: "Software Club", href: "/software" },
    { name: "MHS", href: "https://acesuniben.github.io/mhs/" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const stats = [
    { number: "500+", label: "Students" },
    { number: "1000+", label: "Alumni" },
    { number: "20+", label: "Lecturers" },
    { number: "10+", label: "Advisors" },
    { number: "20+", label: "Awards Won" },
  ];

  const achievements = [
    "Introduction of the Mental Health Scheme",
    "Winners of University based Hackathon and other prizes given",
    "Collaboration with NVIDIA for ACES Week",
    "Collaboration with WAW Detergent for ACES Mental Health Scheme Program",
    "Introduction of the ACES Software and Hardware Club",
    "Collaboration with Google Developers on Campus Uniben Chapter",
  ];

  const services = [
    {
      title: "Past Questions",
      description:
        "Access comprehensive past examination questions to help you prepare effectively for your exams.",
      icon: "📝",
    },
    {
      title: "Software Club",
      description:
        "Join our software development community and enhance your programming skills.",
      icon: "💻",
    },
    {
      title: "Hardware Club",
      description:
        "Explore the world of electronics and hardware engineering with hands-on projects.",
      icon: "⚡",
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <Header />

      <main className="flex flex-col gap-8 md:gap-25 items-center mb-20">
        {/* Hero Text Section */}
        <section className="w-full md:w-1/2 text-center flex flex-col gap-3 mt-10 md:mt-20">
          <h1 className="text-2xl md:text-4xl text-[#2F327D] font-bold leading-tight">
            Know more <span className="text-[#0FACAC]">about us</span> the
            Association
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>of Computer Engineering Students
          </h1>
          <p className="text-sm md:text-base text-gray-600 px-4 md:px-0">
            Know more about us and the achievements, 
            activities that we have done and the impact we have made in the lives of students.
          </p>
        </section>

        {/* Hero Image Section */}
        <section className="w-full flex flex-col items-center text-center px-4 md:px-0">
          <div className="relative w-full max-w-6xl">
            {/* Desktop buttons - positioned absolutely over image */}
            <div className="hidden md:flex gap-3 px-5 w-1/2 absolute left-[30%] z-10">
              <div className="bg-[#166D86] text-white w-2/5 rounded-4xl px-12 py-4 text-2xl font-bold hover:bg-[#1a7a96] transition-colors flex items-center justify-center">
                <Link
                  href="/software"
                  className="text-center whitespace-nowrap"
                >
                  Software Club
                </Link>
              </div>
              <div className="text-[#166D86] border-2 w-2/5 border-[#166D86] bg-white rounded-4xl px-12 py-4 text-2xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Link
                  href="/hardware"
                  className="text-center whitespace-nowrap"
                >
                  Hardware Club
                </Link>
              </div>
            </div>

            

            {/* Hero Image */}
            <Image
              src="/Subtract-About.png"
              alt="ACES Students in classroom"
              width={1088}
              height={549}
              className="hidden md:block w-full h-auto"
            />
            <Image 
            className="md:hidden w-[100%]" 
            src="/mobSubtract-About.png" 
            alt="ACES Students" 
            width={600} 
            height={215} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F327D]">
                Over The <span className="text-[#0FACAC]">Years</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base px-4 md:px-0 max-w-3xl mx-auto">
                The department of Computer Engineering has grown tremendously
                over the years and has produced outstanding graduates who are
                making waves in the tech industry.
              </p>
            </div>
            <div className="flex justify-center items-center gap-3 md:gap-16 max-w-6xl mx-auto overflow-x-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center min-w-[60px] md:min-w-[80px] flex-shrink-0"
                >
                  <div className="text-lg md:text-4xl font-bold text-[#2F327D] mb-1 md:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-[10px] md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Department Section */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <Image
                  src="/Groupela.png"
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
                      About The{" "}
                      <span className="text-[#0FACAC]">Department</span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Computer Engineering is a department in the faculty of
                  Engineering, university of Benin, It consists of five (5)
                  levels from 100L - 500L. <br /> Recently the department had a
                  new HOD and consists of amazing lecturers. The department has
                  a set of executives that govern the affairs of the students
                  and also ensures that things go smoothly and are coordinated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F327D]">
                What We Have <span className="text-[#0FACAC]">Achieved</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-0">
                The department of Computer Engineering has achieved a lot over
                the coming years and that is just the tip of the iceberg. More
                to come !
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 max-w-6xl mx-auto">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2">
                <Image
                  src="/what-we-have-achieved.png"
                  alt="What we have achieved - students working and collaborating"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Right side - Achievements List */}
              <div className="w-full md:w-1/2">
                <div className="space-y-4 md:space-y-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#166D86] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm md:text-lg leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aims and Objectives Section */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F327D]">
                Aims and <span className="text-[#0FACAC]">Objectives</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-0">
                These are the aims and objectives of this amazing Association.
                Read carefully and take note of them and be part of this
                movement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
              {/* Objective 1 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-one.png"
                    alt="Number 1"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To Promote academic excellence through peer support, seminars
                  and mentoring programs.
                </h3>
              </div>

              {/* Objective 2 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-two.png"
                    alt="Number 2"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To Encourage innovation, critical thinking and creative
                  problem-solving
                </h3>
              </div>

              {/* Objective 3 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-three.png"
                    alt="Number 3"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To build leadership capacity among members through organized
                  responsibilities and projects.
                </h3>
              </div>

              {/* Objective 4 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-four.png"
                    alt="Number 4"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To foster a strong sense of unity, collaboration, teamwork
                  within the student body.
                </h3>
              </div>

              {/* Objective 5 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-five.png"
                    alt="Number 5"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To build the gap between students and faculty through regular
                  engagement and dialogue.
                </h3>
              </div>

              {/* Objective 6 */}
              <div
                className="text-center p-4 md:p-6 rounded-2xl bg-white relative"
                style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 md:mb-6 -mt-6 md:-mt-10">
                  <Image
                    src="/number-six.png"
                    alt="Number 6"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-4 text-[#2F327D]">
                  To initiate and participate in community service and social
                  impact projects.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Next Wave Executives */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F327D]">
                Meet the{" "}
                <span className="text-[#0FACAC]">Next Wave Executives</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-0">
                Get to know the people that have taken the responsibility of
                being leaders and also to serve the great students of this
                department
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Swiper Carousel */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  reverseDirection: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="developer-carousel"
              >
                {/* President */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/ZackJennifer.png"
                          alt="Zack Jennifer"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Zack Jennifer
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES President
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Vice President */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/AigbedeWisdom.png"
                          alt="Aigbede E. Wisdom"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Aigbede E. Wisdom
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Vice President
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Sec. Gen. */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/IloSylvia.png"
                          alt="Ilo Sylvia"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Ilo C. Sylvia
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Secretary General
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Asst. Sec. Gen */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/OkerekeAnn.png"
                          alt="Okereke Chidalu Maryann"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Okereke Chidalu Maryann
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Assistant Secretary General
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Fin. Sec. */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/AisekhameDivine.png"
                          alt="Aisekhame T. Divine"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Aisekhame T. Divine
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Financial Secretary
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* PRO */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/OsamedeAyela.png"
                          alt="Osamede Ayela-Uwague"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Osamede Ayela-Uwague
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Public Relations Officer
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Dir. of Welfare */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/ObeiraOsa.png"
                          alt="Obeira Osamudiamen"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Obeira Osamudiamen
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Director of Welfare
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Dir. of Sports */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/JoshuaCharles.png"
                          alt="Joshua Charles"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Joshua Charles
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Director of Sports
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Dir. of Socials */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/GloryOmage.png"
                          alt="Glory O. Omage"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Glory O. Omage
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Director of Socials
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Academic Advisor */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/PeaceAkhaze.png"
                          alt="Peace Akhaze"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Peace Akhaze
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          ACES Academic Advisor
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center text-white hover:bg-[#166D86] transition-colors z-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center text-white hover:bg-[#166D86] transition-colors z-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Custom Pagination */}
              <div className="swiper-pagination-custom mt-8"></div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-[#2F327D]">
              Our <span className="text-[#0FACAC]">Services</span>
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-16 max-w-2xl mx-auto text-sm md:text-lg px-2 md:px-0">
              Get to know what ACES and the Department of Computer Engineering
              offers to the students of this great department
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-5xl mx-auto">
              {/* Past Questions Service */}
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#166D86] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 -mt-6 md:-mt-8">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2F327D]">
                  Past Questions
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>

              {/* Software Club Service */}
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#166D86] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 -mt-6 md:-mt-8">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2F327D]">
                  Software Club
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>

              {/* Hardware Club Service */}
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#166D86] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 -mt-6 md:-mt-8">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17C5,18.1 5.89,19 7,19H9V21H11V19H13V21H15V19H17C18.1,19 19,18.1 19,17V15H21V13H19V11M13,13H11V11H13V13Z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2F327D]">
                  Hardware Club
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Health Section */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#2F327D] text-left">
                  Pay attention to your <br className="hidden md:block" />
                  <span className="text-[#0FACAC]">Mental Health</span>
                </h2>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base text-left">
                    To improve the department and to ensure activities like
                    fresher's welcome, HOD's Cup and others are able to be
                    achieved.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base text-left">
                    paying your ELA Dues shows how important this department is
                    to you.
                  </p>
                </div>
                <div className="text-left">
                  <Link
                    href="https://acesuniben.github.io/mhs/"
                    target="_blank"
                  >
                    <button className="bg-[#166D86] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:bg-[#0FACAC] transition-colors text-sm md:text-base">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative max-w-md">
                  {/* Light bulb icon */}
                  <div className="absolute -top-2 -right-4 w-10 h-10 md:w-12 md:h-12 bg-[#98FF98] rounded-full flex items-center justify-center z-10">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-[#0FACAC]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9,21C9,22.1 9.9,23 11,23H13C14.1,23 15,22.1 15,21V20H9V21M12,2C8.14,2 5,5.14 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9C19,5.14 15.86,2 12,2Z" />
                    </svg>
                  </div>
                  <Image
                    src="/people-walking.png"
                    alt="People walking together for mental health"
                    width={350}
                    height={280}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Developers */}
        <section className="py-8 md:py-16 bg-white w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F327D]">
                Meet the <span className="text-[#0FACAC]">Developers</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-0">
                Get to know the people responsible for creating and developing
                both the mobile and web apps
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Swiper Carousel */}
              <Swiper
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                direction="horizontal"
                className="developer-carousel"
              >
                {/* Developer 1 - Obuh Daniel */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full relative">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/ObuhDaniel.png"
                          alt="Obuh Daniel"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay - positioned at bottom of container */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Obuh Daniel
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          Mobile App Developer
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://twitter.com/obuhdaniel2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://ng.linkedin.com/in/daniel-obuh-04665a2b9"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.github.com/obuhdaniel"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Developer 2 - Ayara Elijah */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full relative">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/AyaraElijah.png"
                          alt="Ayara Elijah"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay - positioned at bottom of container */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Ayara Elijah
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          UI/UX Designer
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://twitter.com/Elijah1480605"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.linkedin.com/in/elijah-ayara-b60666310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.github.com/ayaraelijah"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Developer 3 - Ogbaudu Oghenemaro */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full relative">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/ogbaudu-Maro.png"
                          alt="Oghenemaro Prosper"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay - positioned at bottom of container */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Ogbaudu Oghenemaro
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          Web App Developer
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://twitter.com/odogwuScript"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.linkedin.com/in/oghenemaro-ogbaudu-124a93278"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.github.com/Maroprosper"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Developer 4 - Onwuka David */}
                <SwiperSlide>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full relative">
                    <div className="relative h-96 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src="/OnwukaDavid.jpg"
                          alt="Onwuka David"
                          width={300}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Floating overlay - positioned at bottom of container */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold text-[#2F327D] mb-1">
                          Onwuka David
                        </h3>
                        <p className="text-[#0FACAC] font-medium mb-3 text-sm">
                          Web App Developer
                        </p>
                        <div className="flex justify-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://twitter.com/xavierScript"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://www.linkedin.com/in/david-onwuka-1b882a220?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <a
                              href="https://github.com/xavierScript"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center text-white hover:bg-[#166D86] transition-colors z-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center text-white hover:bg-[#166D86] transition-colors z-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Custom Pagination */}
              <div className="swiper-pagination-custom mt-8"></div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative max-w-6xl mx-auto">
              {/* Desktop Layout - Original design */}
              <div className="hidden md:block">
                <Image
                  src="/GirlSittingWithPen.png"
                  height={234.135}
                  width={1016.67}
                  alt="Newsletter sign-up background"
                  className="w-full"
                />
                <div className="absolute top-[25%] left-[20%] flex flex-col gap-6 items-left w-[60%]">
                  <h2 className="text-[#2F327D] font-bold text-3xl text-left w-[75%]">
                    Get <span className=" text-[#0FACAC]">Past Questions</span>{" "}
                    with ease and ensure you use them efficiently and
                    consistently
                  </h2>
                  <div>
                    <button
                      type="submit"
                      className="bg-[#166D86] text-white rounded-4xl py-2 px-4 hover:bg-[#0FACAC] transition-colors duration-200 font-medium"
                    >
                      Get Past Questions
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Layout - Image background like desktop */}
              <div className="md:hidden">
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src="/GirlSittingWithPen.png"
                    alt="Newsletter sign-up background"
                    width={1000}
                    height={234}
                    className="w-full h-full object-cover"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-center">
                    <div className="max-w-[60%]">
                      <h2 className="text-[#2F327D] font-bold text-xs leading-tight mb-4">
                        Get{" "}
                        <span className="text-[#0FACAC]">Past Questions</span>{" "}
                        with ease and ensure you use them efficiently and
                        consistently
                      </h2>
                      <button
                        type="submit"
                        className="bg-[#166D86] text-white rounded-full py-3 px-6 hover:bg-[#0FACAC] transition-colors duration-200 font-medium text-sm whitespace-nowrap"
                      >
                        Get Past Questions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACES Secretariat Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-left">
                  <span className="text-[#2F327D]">ACES </span>
                  <span className="text-[#0FACAC]">SECRETARIAT</span>
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
                  To improve the department and to ensure activities like
                  fresher's welcome, HOD's Cup and others are able to be
                  achieved.
                </p>

                {/* Location */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Before the Electrical Engineering Building, Faculty of
                      Engineering, University of Benin, Ugbowo
                    </p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-3">
                  <a href="tel:+2348054287652">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        08054287652
                      </span>
                    </div>
                  </a>

                  <a href="tel:+2348054287652">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        08054287652
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
              {/* Map Section */}
              <div className="w-full md:w-1/2">
                <div className="bg-gray-100 h-60 md:h-80 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.7857842896586!2d5.626827814683795!3d6.399267925756586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d7dabf8a4ca1%3A0x6d9b2d4c4b4b4b4b!2sFaculty%20of%20Engineering%2C%20University%20of%20Benin!5e0!3m2!1sen!2sng!4v1640000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ACES Secretariat Location - Faculty of Engineering, University of Benin"
                  ></iframe>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#2F327D]">
                  <span className="text-[#0FACAC]">ACES SECRETARIAT</span>
                </h2>

                <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-base text-left">
                  To improve the department and to ensure activities like
                  fresher's welcome, HOD's Cup and others are able to be
                  achieved.
                </p>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#166D86] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-600 leading-relaxed text-base">
                        <span className="font-semibold text-[#2F327D]">
                          Before the Electrical Engineering Building,
                        </span>
                        <br />
                        Faculty of Engineering, University of Benin, Ugbowo
                      </p>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex flex-row gap-6 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#166D86] rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-[#2F327D] font-semibold text-base">
                        08054287652
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#166D86] rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-[#2F327D] font-semibold text-base">
                        08054287652
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
