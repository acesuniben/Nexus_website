"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  TimetableEntry,
  ClassItem,
  fetchAllTimetable,
  filterTimetableEntries,
  getDefaultFilters,
} from "./timetable";

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedSession, setSelectedSession] = useState("2025/2026");
  const [selectedSemester, setSelectedSemester] = useState("First Semester");
  const [selectedLevel, setSelectedLevel] = useState("500L");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const sessions = ["2025/2026" ,"2024/2025", "2023/2024"];
  const semesters = ["First Semester", "Second Semester"];
  const levels = ["100L", "200L", "300L", "400L", "500L"];
  const [rawEntries, setRawEntries] = useState<TimetableEntry[]>([]);
  const [loadingTimetable, setLoadingTimetable] = useState<boolean>(false);
  const [errorTimetable, setErrorTimetable] = useState<string | null>(null);
  const [noTimetableMsg, setNoTimetableMsg] = useState<string | null>(null);

  const TIMETABLE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/timetable/read`;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    async function loadAllOnce() {
      setLoadingTimetable(true);
      setErrorTimetable(null);
      setNoTimetableMsg(null);
      try {
        const entries = await fetchAllTimetable(TIMETABLE_URL, { limit: 1000, signal: controller.signal });
        if (!cancelled) {
          setRawEntries(entries as TimetableEntry[]);
          if (!entries.length) setNoTimetableMsg('No timetable entries available.');
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (!cancelled) {
          setErrorTimetable(`Could not fetch timetable. ${msg}`);
          setRawEntries([]);
        }
      } finally {
        if (!cancelled) setLoadingTimetable(false);
      }
    }
    loadAllOnce();
    return () => { cancelled = true; controller.abort(); };
  }, [TIMETABLE_URL]);

  // On client mount, set defaults: day from local date and session/semester from API
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    getDefaultFilters(undefined, { signal: controller.signal })
      .then((d) => {
        if (!mounted) return;
        if (d.day) setSelectedDay(d.day);
        if (d.session) setSelectedSession(d.session);
        if (d.semester) {
          const sem = (d.semester || '').toString().trim();
          const mapped = /first/i.test(sem) ? 'First Semester' : /second/i.test(sem) ? 'Second Semester' : sem;
          setSelectedSemester(mapped);
        }
      })
      .catch(() => {
        // ignore — keep existing defaults
      });
    return () => { mounted = false; controller.abort(); };
  }, []);

  const currentDayClasses = useMemo((): ClassItem[] => {
    return filterTimetableEntries(rawEntries as TimetableEntry[], {
      day: selectedDay,
      level: selectedLevel,
      session: selectedSession,
      semester: selectedSemester,
    });
  }, [rawEntries, selectedDay, selectedLevel, selectedSession, selectedSemester]);

  // parsing/formatting and filtering logic now live in ./timetable.ts

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2F327D] mb-4">
            Departmental <span className="text-[#0FACAC]">Timetable</span>
          </h1>
          <p className="text-[#696984] text-sm md:text-base max-w-lg mx-auto">
            Do not know when you have classes and which lecturers take those courses? Take a look below to find out.
          </p>
        </section>

        {/* show loading or fetch error for timetable */}
        {loadingTimetable && (
          <div className="text-center text-[#696984] mb-4">Loading timetable...</div>
        )}
        {errorTimetable && (
          <div className="text-center text-red-500 mb-4">{errorTimetable}</div>
        )}
        {noTimetableMsg && !loadingTimetable && !errorTimetable && (
          <div className="text-center text-yellow-600 mb-4">{noTimetableMsg}</div>
        )}

        {/* Filter Controls Section */}
        <section className="flex flex-wrap gap-4 mb-8 justify-center">
          {/* Day Selector */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="appearance-none bg-[#166D86] text-sm md:text-lg text-white px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-[#0e9999] transition-colors min-w-[120px] text-center"
            >
              {days.map(day => (
                <option key={day} value={day} className="bg-white text-[#696984]">
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute text-[#696984] right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
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
              className="appearance-none bg-white text-sm md:text-lg text-[#696984] border-2 border-[#166D86] px-4 py-2 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[140px] text-center"
            >
              {sessions.map(session => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#696984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Semester Selector */}
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="appearance-none bg-white border-2 text-sm md:text-lg border-[#166D86] text-[#696984] px-4 py-2 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[160px] text-center"
            >
              {semesters.map(semester => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#696984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Level Selector */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="appearance-none bg-white text-sm md:text-lg border-2 border-[#166D86] text-[#696984] px-4 py-2 rounded-full font-semibold cursor-pointer hover:border-[#0FACAC] transition-colors min-w-[100px] text-center"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#696984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {currentDayClasses.length > 0 ? (
                currentDayClasses.map((classItem: ClassItem, index: number) => (
                <div key={index} className="flex w-full gap-2">
                  {/* Time */}
                  <div className="flex md:w-1/5 justify-between items-start mb-3">
                    <div className="text-sm font-medium">
                      <div className={'text-[#2F327D]'}>
                        {classItem.time}
                      </div>
                      <div className={`text-xs text-[#2F327D]`}>
                        {classItem.endTime}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-[100%] p-4 md:p-6 rounded-xl transition-all duration-200 hover:shadow-lg ${
                      index % 2 === 0
                        ? 'bg-[#166D86] text-white'
                        : 'bg-[#98ff9814] border border-gray-200 text-[#2F327D] hover:bg-gray-50'
                    }`}
                  >
                    

                    {/* Course Info */}
                    <div className="space-y-2">
                      <div className={`text-lg font-bold ${index % 2 === 0 ? 'text-white' : 'text-[#166D86]'}`}>
                        {classItem.course}
                      </div>
                      <h3 className={`font-semibold text-sm md:text-base ${index % 2 === 0 ? 'text-white' : 'text-[#2F327D]'}`}>
                        {classItem.title}
                      </h3>
                      <div className={`text-xs md:text-sm space-y-1 ${index % 2 === 0 ? 'text-[]' : 'text-gray-600'}`}>
                        {classItem.lecturers.map((lecturer: string, lecIndex: number) => (
                          <div key={lecIndex} className="flex items-center">
                            <span className="mr-2">•</span>
                            <span>{lecturer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No classes scheduled</div>
                  <div className="text-gray-500 text-sm">
                    {noTimetableMsg ? noTimetableMsg : `No classes found for ${selectedDay} in ${selectedLevel}`}
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
                
                <p className="text-sm md:text-base text-[#565886] leading-relaxed">
                  Curious to know the lecturers of this amazing department? These are amazing lecturers in this department.
                </p>
                
                <p className="text-sm md:text-base text-[#565886] leading-relaxed">
                  They have amazing and great qualifications to ensure you are knowledgeable in different aspects of Computer Engineering.
                </p>
                
                <button className="bg-[#166D86] hover:bg-[#0e9999] text-white font-semibold px-6 py-3 md:px-4 md:py-2 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl text-sm md:text-base">
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
              <p className="text-sm md:text-base text-[#2F327D]">
                Do you have questions about the timetable? We have you covered. You do not need to worry.
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      How do I switch between days of the week?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      Use the day selector dropdown at the top left (e.g., Monday, Tuesday, etc.) to view classes for a specific day.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      How can I change my level or semester?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      At the top of the page, you can select your academic year, semester (First/Second), and level (100L-500L) from the dropdown menus.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      What information is shown for each class?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      Each timetable block displays:
                    </p>
                    <ul className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed mt-2 ml-4 space-y-1">
                      <li>• Course Code (e.g., CPE 461)</li>
                      <li>• Course Title (e.g., Software Engineering II)</li>
                      <li>• Lecturers (e.g., Engr. Dr. Isi, Engr. Dr. Olaye)</li>
                      <li>• Time Slot (e.g., 9:00 AM – 10:00 AM)</li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      Can I see the timetable for the entire week at once?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      Currently, the page shows classes day by day. To see another day, simply switch using the day dropdown.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      Who do I contact for timetable errors or updates?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      Report any issues (wrong time, lecturer, or course) to your Class Rep or the Departmental Academic Secretary.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#166D86] text-white rounded-t-xl transition-colors">
                    <span className="font-semibold text-white text-sm md:text-base">
                      Why do some courses appear in multiple time slots?
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                        <svg className="w-4 h-4 text-[#166D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pt-4 pb-6">
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base leading-relaxed">
                      Some courses span multiple hours or may have different sessions (lecture, tutorial, or lab). That is why they appear in more than one block.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

          {/* CTA Section */}
                 
          <section className="w-full flex justify-center items-center">
            <div className="relative w-[90%]">
              <Image src="/subscribe.svg" height={712.5} width={1525} alt="" className="hidden md:block w-full"/>
              <Image src="/mobSub2.svg" height={528} width={356} alt="" className=" md:hidden w-full"/>
              <div className="px-5 py-2 md:p-0 absolute top-[20%] md:top-[15%] md:left-[20%] m-auto flex flex-col md:flex-row gap-5 md:gap-20 items-center md:items-start w-[100%] md:w-[60%] h-full">
                  <div className="w-auto md:w-2/3 flex flex-col gap-5 md:gap-10 items-start">
                    <p className="text-[#2F327D] text-xl md:text-3xl font-bold ">Get <span className="text-[#0FACAC]">Past Questions</span> with ease and ensure you use them efficiently and consistently</p>
                    <div className="text-white  bg-[#166D86] text-sm md:text-lg px-2 py-1 md:px-4 md:py-2 rounded-3xl"><a href="https://drive.google.com/drive/folders/1lOYE5bFrw7srXhODcYV8siD25I0GPSJA?usp=sharing">Get Past Questions</a></div>
                  </div>
                  <div>
                    <Image src="/laptopGirl.svg" width={174.31} height={227.61} alt=""/>
                  </div>
              </div>
            </div>
          </section>
              

      </main>

      <Footer />
    </div>
  );
}
