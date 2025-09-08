"use client";
import { useState } from "react"; // Only keep if used below
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface ClassItem {
  time: string;
  endTime: string;
  course: string;
  title: string;
  lecturers: string[];
  type: string;
}

interface TimetableData {
  [key: string]: ClassItem[];
}

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedSession, setSelectedSession] = useState("2024/2025");
  const [selectedSemester, setSelectedSemester] = useState("First Semester");
  const [selectedLevel, setSelectedLevel] = useState("500L");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const sessions = ["2024/2025", "2023/2024"];
  const semesters = ["First Semester", "Second Semester"];
  const levels = ["100L", "200L", "300L", "400L", "500L"];

  // Sample timetable data
  const timetableData: TimetableData = {
    Monday: [
      {
        time: "9:00 AM",
        endTime: "10:00 AM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      },
      {
        time: "10:00 AM",
        endTime: "11:00 AM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      },
      {
        time: "11:00 AM",
        endTime: "12:00 PM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      },
      {
        time: "12:00 PM",
        endTime: "2:00 PM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      },
      {
        time: "1:00 PM",
        endTime: "2:00 PM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      },
      {
        time: "2:30 PM",
        endTime: "3:00 PM",
        course: "CPE 451",
        title: "Software Engineering II",
        lecturers: ["Eng. Dr. Iu", "Eng. Dr. Okpue"],
        type: "lecture"
      }
    ],
    Tuesday: [
      {
        time: "9:00 AM",
        endTime: "10:00 AM",
        course: "CPE 452",
        title: "Digital Signal Processing",
        lecturers: ["Eng. Dr. Adeyemi", "Eng. Dr. Bello"],
        type: "lecture"
      }
    ],
    Wednesday: [
      {
        time: "8:00 AM",
        endTime: "9:00 AM",
        course: "CPE 453",
        title: "Computer Networks",
        lecturers: ["Eng. Dr. Johnson"],
        type: "lecture"
      }
    ],
    Thursday: [
      {
        time: "10:00 AM",
        endTime: "11:00 AM",
        course: "CPE 454",
        title: "Database Systems",
        lecturers: ["Eng. Dr. Smith"],
        type: "lecture"
      }
    ],
    Friday: [
      {
        time: "2:00 PM",
        endTime: "3:00 PM",
        course: "CPE 455",
        title: "Project Management",
        lecturers: ["Eng. Dr. Brown"],
        type: "lecture"
      }
    ]
  };

  const getCurrentDayClasses = (): ClassItem[] => {
    return timetableData[selectedDay] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2F327D] mb-4">
            Departmental <span className="text-[#0FACAC]">Timetable</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto">
            Don't know when you have classes and the lecturers taking those courses? Take a look below and find out.
          </p>
        </section>

        {/* Filter Controls Section */}
        <section className="flex flex-wrap gap-4 mb-8 justify-center">
          {/* Day Selector */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="appearance-none bg-[#0FACAC] text-white px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-[#0e9999] transition-colors min-w-[120px] text-center"
            >
              {days.map(day => (
                <option key={day} value={day} className="bg-white text-black">
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Session Selector */}
          <div className="relative">
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[140px] text-center"
            >
              {sessions.map(session => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Semester Selector */}
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[160px] text-center"
            >
              {semesters.map(semester => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Level Selector */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[100px] text-center"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* Timetable Display Section */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#2F327D] mb-6">
              {selectedDay} Schedule - {selectedLevel}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {getCurrentDayClasses().length > 0 ? (
                getCurrentDayClasses().map((classItem: ClassItem, index: number) => (
                  <div 
                    key={index} 
                    className={`p-4 md:p-6 rounded-xl transition-all duration-200 hover:shadow-lg ${
                      index % 2 === 0 
                        ? 'bg-[#0FACAC] text-white' 
                        : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {/* Time */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-medium">
                        <div className={index % 2 === 0 ? 'text-white' : 'text-gray-600'}>
                          {classItem.time}
                        </div>
                        <div className={`text-xs ${index % 2 === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                          {classItem.endTime}
                        </div>
                      </div>
                    </div>
                    
                    {/* Course Info */}
                    <div className="space-y-2">
                      <div className={`text-lg font-bold ${index % 2 === 0 ? 'text-white' : 'text-[#0FACAC]'}`}>
                        {classItem.course}
                      </div>
                      <h3 className={`font-semibold text-sm md:text-base ${index % 2 === 0 ? 'text-white' : 'text-[#2F327D]'}`}>
                        {classItem.title}
                      </h3>
                      <div className={`text-xs md:text-sm space-y-1 ${index % 2 === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                        {classItem.lecturers.map((lecturer: string, lecIndex: number) => (
                          <div key={lecIndex} className="flex items-center">
                            <span className="mr-2">•</span>
                            <span>{lecturer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No classes scheduled</div>
                  <div className="text-gray-500 text-sm">
                    No classes found for {selectedDay} in {selectedLevel}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Know your Lecturers Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold text-[#2F327D] leading-tight">
                  Know your <span className="text-[#0FACAC]">Lecturers</span>
                </h2>
                
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Curious to know the lecturers of this amazing department? These are amazing lecturers in this department.
                </p>
                
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  They have amazing and great qualifications to ensure you are knowledgeable in different aspects of Computer Engineering.
                </p>
                
                <button className="bg-[#0FACAC] hover:bg-[#0e9999] text-white font-semibold px-6 py-3 md:px-8 md:py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl text-sm md:text-base">
                  Explore
                </button>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative">
                  <Image
                    src="/lecturer-timetable.png"
                    alt="Computer Engineering Lecturer"
                    width={400}
                    height={300}
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-4">
                Frequently Asked <span className="text-[#0FACAC]">Questions</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Do you have questions about the time table? We've got you. You don't need to worry.
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      How do I switch between days of the week?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Use the day selector dropdown at the top left (e.g., Monday, Tuesday, etc.) to view classes for a specific day.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      How can I change my level or semester?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      At the top of the page, you can select your academic year, semester (First/Second), and level (100L-500L) from the dropdown menus.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      What information is shown for each class?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Each timetable block displays:
                    </p>
                    <ul className="text-gray-600 text-sm md:text-base leading-relaxed mt-2 ml-4 space-y-1">
                      <li>• Course Code (e.g., CPE 451)</li>
                      <li>• Course Title (e.g., Software Engineering II)</li>
                      <li>• Lecturers (e.g., Engr. Dr. Iu, Engr. Dr. Okpue)</li>
                      <li>• Time Slot (e.g., 9:00 AM – 10:00 AM)</li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      Can I see the timetable for the entire week at once?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Currently, the page shows classes day by day. To see another day, simply switch using the day dropdown.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      Who do I contact for timetable errors or updates?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Report any issues (wrong time, lecturer, or course) to your Class Rep or the Departmental Academic Secretary.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-[#2F327D] font-semibold text-sm md:text-base">
                      Why do some courses appear in multiple time slots?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-[#0FACAC] rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Some courses span multiple hours or may have different sessions (lecture, tutorial, or lab). That's why they appear in more than one block.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

          {/* CTA Section */}
                 <section className="py-8 md:py-16 bg-white">
                  <div className="container mx-auto px-4">
                            <div className="relative max-w-6xl mx-auto">
                              {/* Desktop Layout - Original design */}
                              <div className="hidden md:block">
                                <Image src="/GirlSittingWithPen.png" height={234.135} width={1016.67} alt="Newsletter sign-up background" className="w-full"/>
                                <div className="absolute top-[25%] left-[20%] flex flex-col gap-6 items-left w-[60%]">
                                  <h2 className="text-[#2F327D] font-bold text-3xl text-left w-[75%]">Get <span className=" text-[#0FACAC]">Past Questions</span> with ease and ensure you use them efficiently and consistently</h2>          
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
                                        Get <span className="text-[#0FACAC]">Past Questions</span> with ease and ensure you use them efficiently and consistently
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

      </main>

      <Footer />
    </div>
  );
}
