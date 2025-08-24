"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function About() {
  const pathname = usePathname();
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Hardware Club", href: "/hardware" },
    { name: "Software Club", href: "/software" },
    { name: "MHS", href: "/mhs" },
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
    "First Position in National Competition",
    "Best Engineering Department Award",
    "Innovation in Technology Award",
    "Community Service Excellence",
    "Outstanding Academic Performance",
    "Research Excellence Award",
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

  const lecturers = [
    {
      name: "Prof. Dr. John",
      title: "Head of Department",
      image: "/lecturer1.jpg",
      qualification: "PhD in Computer Engineering",
    },
    {
      name: "Dr. Jane Smith",
      title: "Senior Lecturer",
      image: "/lecturer2.jpg",
      qualification: "PhD in Software Engineering",
    },
    {
      name: "Dr. Mike Johnson",
      title: "Associate Professor",
      image: "/lecturer3.jpg",
      qualification: "PhD in Hardware Engineering",
    },
  ];

  const executives = [
    {
      name: "Prof. Dr. John",
      title: "Head of Department",
      image: "/exec1.jpg",
      qualification: "PhD in Computer Engineering",
    },
    {
      name: "Dr. Jane Smith",
      title: "Senior Lecturer",
      image: "/exec2.jpg",
      qualification: "PhD in Software Engineering",
    },
    {
      name: "Dr. Mike Johnson",
      title: "Associate Professor",
      image: "/exec3.jpg",
      qualification: "PhD in Hardware Engineering",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-around items-center py-4">
        <div>
          <Image src="/logo.png" alt="ACES Logo" width={100} height={100} />
        </div>
        <nav className="w-2/3">
          <ul className="flex justify-evenly">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm font-medium hover:text-[#0FACAC] transition-colors",
                    pathname === link.href ? "text-[#0FACAC]" : "text-black"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center bg-white py-10">
          <div className="w-full max-w-4xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2E4A7B]">
              Know more <span className="text-[#0FACAC]">about us</span> the
              Association
              <br />
              of Computer Engineering Students
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Know more about us and the achievements, activities that we have
              done and the impact we have made in the lives of students.
            </p>
          </div>

          <div className="relative w-full max-w-4xl">
            <div className="flex gap-3 px-5 w-fit absolute left-1/2 transform -translate-x-1/2 top-4 z-10">
              <Link
                href="/software"
                className="bg-[#0FACAC] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#166D86] transition-colors"
              >
                Software Club
              </Link>
              <Link
                href="/hardware"
                className="text-[#0FACAC] border-2 border-[#0FACAC] bg-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#0FACAC] hover:text-white transition-colors"
              >
                Hardware Club
              </Link>
            </div>
            <Image
              src="/Subtract-about.svg"
              alt="ACES Students in classroom"
              width={1088}
              height={549}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Over The <span className="text-[#0FACAC]">Years</span>
              </h2>
              <p className="text-gray-600">
                The department of Computer Engineering has grown tremendously
                over the years and has produced outstanding graduates who are
                making waves in the tech industry.
              </p>
            </div>
            <div className="flex justify-center items-center gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#166D86] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Department Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-12">
              <div className="w-1/2">
                <Image
                  src="/Group 17.svg"
                  alt="Students in classroom"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-[#98FF98] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#2E4A7B]">
                    About The <span className="text-[#0FACAC]">Department</span>
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Computer Engineering is a department in the faculty of
                  Engineering, university of Benin, It consists of five (5)
                  levels from 100L - 500L.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Recently the department had a new HOD and consists of amazing
                  lecturers. The department has a set of executives that govern
                  the affairs of the students and also ensures that things go
                  smoothly and are coordinated
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">
              What We Have <span className="text-[#0FACAC]">Achieved</span>
            </h2>
            <div className="flex justify-center">
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#0FACAC] rounded-full"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-12">
              <div className="w-1/2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-[#98FF98] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#2E4A7B]">
                    Our <span className="text-[#0FACAC]">Mission & Vision</span>
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      The{" "}
                      <span className="text-[#0FACAC] font-semibold">
                        Mission
                      </span>{" "}
                      of the Department is to ensure that the students
                      participate in lala land and enjoyment galore
                      independently of some kind things
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      The{" "}
                      <span className="text-[#0FACAC] font-semibold">
                        Vision
                      </span>{" "}
                      of the Department is to ensure that the students
                      participate in lala land and enjoyment galore
                      independently of some kind things
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <Image
                  src="/Group 17.svg"
                  alt="Mission and Vision"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-[#2E4A7B]">
              Our <span className="text-[#0FACAC]">Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Past Questions Service */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0FACAC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2E4A7B]">
                  Past Questions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>

              {/* Software Club Service */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0FACAC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2E4A7B]">
                  Software Club
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>

              {/* Hardware Club Service */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0FACAC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17C5,18.1 5.89,19 7,19H9V21H11V19H13V21H15V19H17C18.1,19 19,18.1 19,17V15H21V13H19V11M13,13H11V11H13V13Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2E4A7B]">
                  Hardware Club
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  There are different categories of past questions in different
                  courses from 100L to 500L that you can study from and prepare
                  for exams
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Know Your Lecturers Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-[#2E4A7B]">
              Know Your <span className="text-[#0FACAC]">Lecturers</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Engr. Dr. Isi */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Engr. Dr. Isi Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Engr. Dr. Isi
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-2">
                      Head of Department
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Bookworm, creative software developer with precision
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engr. Slyvester */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Engr. Slyvester Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Engr. Slyvester
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-2">
                      500L Course Adviser
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Bookworm, creative software developer with precision
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prof. S.T. Apeh */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Prof. S.T. Apeh Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Prof. S.T. Apeh
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-2">
                      Professor
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Bookworm, creative software developer with precision
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Health Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-12">
              <div className="w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#2E4A7B]">
                  Pay attention to your <br />
                  <span className="text-[#0FACAC]">Mental Health</span>
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    To improve the department and to ensure activities like
                    fresher's welcome, HOD's Cup and others are able to be
                    achieved.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    paying your ELA Dues shows how important this department is
                    to you.
                  </p>
                </div>
                <button className="bg-[#0FACAC] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#166D86] transition-colors">
                  Explore
                </button>
              </div>
              <div className="w-1/2 relative">
                <div className="relative">
                  {/* Light bulb icon */}
                  <div className="absolute top-4 right-8 w-16 h-16 bg-[#98FF98] rounded-full flex items-center justify-center z-10">
                    <svg
                      className="w-8 h-8 text-[#0FACAC]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9,21C9,22.1 9.9,23 11,23H13C14.1,23 15,22.1 15,21V20H9V21M12,2C8.14,2 5,5.14 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9C19,5.14 15.86,2 12,2Z" />
                    </svg>
                  </div>
                  <Image
                    src="/people-walking.png"
                    alt="People walking together for mental health"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Next Wave Executives */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-[#2E4A7B]">
              Meet the{" "}
              <span className="text-[#0FACAC]">Next Wave Executives</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Zack Jennifer - President */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Zack Jennifer Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Zack Jennifer
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-4">
                      ACES President
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zack Jennifer - Vice President (Middle) */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Zack Jennifer Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Zack Jennifer
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-4">
                      ACES Vice President
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zack Jennifer - Vice President (Right) */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Zack Jennifer Photo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
                    <h3 className="text-xl font-bold mb-1 text-[#2E4A7B]">
                      Zack Jennifer
                    </h3>
                    <p className="text-[#0FACAC] font-semibold text-sm mb-4">
                      ACES Vice President
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative bg-gradient-to-r from-[#A8E6CF] to-[#B8E6D6] rounded-3xl overflow-hidden min-h-[400px] flex items-center">
              {/* Paper plane icon */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between w-full px-12">
                <div className="flex-1 max-w-md">
                  <h2 className="text-3xl font-bold mb-6 text-[#2E4A7B] leading-tight">
                    Get <span className="text-[#0FACAC]">Past Questions</span>{" "}
                    with ease <br />
                    and ensure you use them <br />
                    efficiently and consistently
                  </h2>
                  <button className="bg-[#0FACAC] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#166D86] transition-colors">
                    Get Past Questions
                  </button>
                </div>

                {/* Girl sitting image */}
                <div className="flex-1 flex justify-end">
                  <Image
                    src="/girl-sitting.png"
                    alt="Girl sitting and studying"
                    width={400}
                    height={300}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-8 right-8 opacity-20">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACES Secretariat Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex gap-12 items-center">
              <div className="w-1/2">
                <div className="bg-gray-100 h-80 rounded-lg overflow-hidden">
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
              <div className="w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#2E4A7B]">
                  <span className="text-[#0FACAC]">ACES SECRETARIAT</span>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  To improve the department and to ensure activities like
                  fresher's welcome, HOD's Cup and others are able to be
                  achieved.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 leading-relaxed">
                        <span className="font-semibold text-[#2E4A7B]">
                          Before the Electrical Engineering Building,
                        </span>
                        <br />
                        Faculty of Engineering, University of Benin, Ugbowo
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-[#2E4A7B] font-semibold">
                        08054287652
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#0FACAC] rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <span className="text-[#2E4A7B] font-semibold">
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
      <footer className="bg-[#1A4B5C] text-white py-12 rounded-t-3xl">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* ACES Uniben Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0FACAC] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">ACES Uniben</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Copyright © 2020 Landify UI Kit.
                <br />
                All rights reserved
              </p>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#0FACAC] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 3.95-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#0FACAC] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#0FACAC] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#0FACAC] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hardware"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Hardware Club
                  </Link>
                </li>
                <li>
                  <Link
                    href="/software"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Software Club
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mhs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    MHS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/past-questions"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Past Questions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/software"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Software Club
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hardware"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Hardware Club
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mhs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    MHS
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact us</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-300">Email : acesuniben@gmail.com</p>
                </div>
                <div>
                  <p className="text-gray-300">Phone no : 08026255242</p>
                </div>
                <div>
                  <p className="text-gray-300">Address : ACES Secretariat,</p>
                  <p className="text-gray-300">
                    Faculty of Engineering, Uniben
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
