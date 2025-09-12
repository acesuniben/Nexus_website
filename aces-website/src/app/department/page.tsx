"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LecturerModal from "@/components/LecturerModal";

export default function Department() {
  const activities = [
      {image: "/number-one.png", paragraph: "To empower our students to gain technical as well as the theoretical knowledge needed for leadership in the field."},
      {image: "/number-two.png", paragraph: "To maintain a high standard of standard of Computer Engineering education through outstanding teaching, innovative research, output that addresses the changing needs of the society."},
      {image: "/number-three.png", paragraph: "To plan, design, construct and operate society’s technological and ICT infrastructure for the socio-economic enhancement of the nation."},
      {image: "/number-four.png", paragraph: "To engage students in basic and applied research in Computer Software and hardware design."},
      {image: "/number-five.png", paragraph: "To prepare the next generation of graduates as highly skilled and ethical professionals who can compete in a global competitive skilled market"},
  ]
  const lecturers = [
    {image:"/isi.png", name: "Engr. Dr. Isi Edeoghon", title: "Head of Department", bio:"Engr. Dr. Isi Edeoghon is a Senior Lecturer with a Doctor of Philosophy degree in the Department of Computer Engineering at the University of Benin in Benin City, Nigeria. He specializes in Information and Communication Technology (ICT) and software development, with a focus on areas like energy management and network deployment. His research interests and publications cover topics such as: Telecommunications,  including cellular and microwave communication, LTE, and GSM. Software Engineering, with work on agile software development and web-based software for network deployment. Network Communication, including research on LoRaWAN, low-power wide area networks (LPWAN), and DVB-T2 signals. IoT (Internet of Things), having worked on projects like an intelligent IoT-based solar inverter and a wireless fingerprint attendance management system. Dr. Isi Edeoghon has co-authored numerous academic papers on these subjects. He is listed on Google Scholar and ResearchGate, where his research profile and publications are available."}, 
    {image:"/apeh.png", name: "Prof. S. T. Apeh", title: "", bio:"Meet Professor S. T. Apeh, he is one of the professors in the department of computer engineering, he specializes in aspects of Microcontrollers, Digital Signal Processing, Hardware Designs, Microprocessors, Computer Architecture etc. He was the first Head of Department (HOD) in the Department of Computer Engineering. He is known for his Dedication in lecturing the students of this amazing department. He teaches few 400L and 500L Courses like CPE 522, CPE 512, CPE 575, CPE 475 etc.. and also post-graduate courses."},
    {image:"/question.png", name: "Engr. Dr. Omoifo Osemekhian", title: "", bio:""},
    {image:"/okosun.png", name: "Engr. Dr. Mrs. Okosun", title: "", bio:""},
    {image:"/olaye.png", name: "Engr. Dr. Edoghogho Olaye", title: "", bio:"Dr. Edoghogho Olaye lectures at the University of Benin and leads the Whitewater Research Group (WWRG). His passion lies in leveraging technology to modernize manual processes, particularly through embedded systems, intelligent systems, and software engineering. He is actively involved in teaching and supervision at both undergraduate and postgraduate (Masters and PhD) levels. His commitment to education and impactful industry collaborations is further exemplified by his success in securing research grants for projects focused on AI-driven healthcare and mobile communication network quality."},
    {image:"/obayuwana.png", name: "Engr. Dr. A. Obayuwana", title: "", bio: "Engr. Dr. A. Obayuwana is a seasoned researcher and computer engineer with over eight years of comprehensive experience spanning both industry and academia. He has worked as a technical consultant at Atiode Solar Systems Ltd and with the Nigerian Navy, where he was trained in Warships Engine Room Simulation by experts from New Delhi, India in 2013. Currently, Dr. Obayuwana is a senior lecturer in the Department of Computer Engineering at the University of Benin, a role he's held since November 2014. His research focus includes cutting-edge areas such as Geospatial Intelligence, Artificial Intelligence (AI), Wireless communication systems, Internet of Things (IoT), and Automation systems. His contribution extends beyond research, as he played a vital role in curriculum development and review, notably serves as the curriculum review coordinator and has developed the latest edition of the computer Engineering Handbook, encompassing BMAS and CCMAS curricula. Dr. Obayuwana contributes significantly to both undergraduate and postgraduate instruction, teaching courses in embedded systems, system programming, wireless communication, and artificial intelligence.His dedication to academic excellence, collaborative research, and mentorship has made him a valued member of the Department of Computer Engineering and the Faculty of Engineering as a whole. Dr. Obayuwana has also engaged in recent international collaborations in research with institutions outside Nigeria, further enhancing his expertise and contributions to the field. With his wealth of experience and expertise, Dr. Obayuwana continues to make a meaningful impact in academia and industry.",},
    {image:"/question.png", name: "Dr. Prudence Ehizuenlen", title: "",bio:""},
    {image:"/eguagie.png", name: "Engr. Eguagie Evbuomwan", title: "", bio:""},
    {image:"/sly.png", name: "Engr. Slyvester Akinbohun", title: "", bio:""},
    {image:"/okoye.png", name: "Engr. James Okoye", title: "", bio:""},
    {image:"/omosigho.png", name: "Engr. Moses Omosigho", title: "", bio:"Meet Engr Moses omoshigo, one of the lecturers in computer engineering. He spealizes in Cybersecurity, web development, software development, Internet Of Things (iot), Information Management etc. He's the current exam officer for 24/25 academic session. He is also a researcher that have written papers which include: The Future of Cyber Security: Examining the Security Challenges and Trends in Smart Technology. IoT Device Security, Privacy, and Risks in Smart City Environments etc."},
    {image:"/solomon.png", name: "Engr. Solomon", title: "", bio:""},
    {image:"/osas.png", name: "Engr. Osas", title: "ELA Coordinator", bio: ""},
  ];

  const [selected, setSelected] = useState(null as null | any);
  const [open, setOpen] = useState(false);
  return ( 
    <div className="">
        <Header/>
        <main className="flex flex-col gap-16 md:gap-30 items-center mb-20">
          {/* Hero Section */}
          <section className="w-[90%] md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20 px-4">
            <h1 className="text-2xl md:text-4xl text-[#2F327D] font-bold leading-tight">Know more about the <span className="text-[#0FACAC]">Lecturers</span><br className="hidden md:block"/> and the <span className="text-[#0FACAC]">department</span> as a whole.</h1>
            <p className="text-sm md:text-base text-gray-600">Know more about us the great department of computer Engineering and also the lecturers and staff. </p>
          </section>

          {/* Hero Image with Navigation Buttons */}
          <section className="flex flex-col items-center text-center w-[90%]">
            <div className="relative w-full md:w-auto  md:px-0">
              <div className="hidden md:flex gap-1 md:gap-3 px-2 md:py-0 md:px-5 w-1/2 absolute left-[30%] top-[0%]">
                <div className="bg-[#166D86] text-white w-2/5 rounded-4xl md:px-10 md:py-4 text-xs md:text-xl font-bold p-0.5"><Link key='about' href='/about'>About Us </Link></div>
                <div className="text-[#166D86] border-2  w-2/5 border-[#166D86] bg-white rounded-4xl p-0.5 md:px-10 md:py-4 text-xs md:text-xl font-bold"><Link key='blog' href='/blog'> Blog </Link></div>
              </div>
              <Image className="hidden md:block" src="/Departmental.png" alt="ACES Students" width={1088} height={549} />
              <Image className="md:hidden w-[100%]" src="/mobDepartment.png" alt="ACES Students" width={600} height={215} />
            </div>
          </section>

          {/* About the Club Section */}
          <section className="flex flex-col-reverse md:flex-row gap-20 md:gap-0 justify-between md:justify-evenly items-center">
            <div className="flex flex-col gap-2 relative w-[90%] md:w-2/5 items-start justify-evenly">
              <Image src="/Pointee.svg" width={500} height={64.99} alt="pointers illustration" className="absolute -top-5 left-0 md:-left-4 md:-top-5 -z-0"/>
              <h2 className="text-[#2F327D] font-bold text-2xl md:text-4xl relative">About the<span className="text-[#0FACAC] z-10"> Department</span></h2>
              <p className="text-[#2F327D] font-semibold">Computer Engineering involves the knowledge and skills directed towards analysis, planning and design of Computer System including hardware, software, networks for Data transmission and multimedia. Computer Engineering is also involved in the developing of new ways to tackle challenges in instrumentation, control, manufacturing and electronics by integrating computer capabilities.</p>
            </div>
            <div className="w-[90%] md:w-2/5">
              <Image src="/signout.png" height={359.33} width={498.67} alt="Picture of final year students during their teacher in their signout"/>
            </div>
          </section>
        
          <section className="text-center flex flex-col items-center gap-20 w-[100%] md:w-full">
            <div className="w-[90%] md:w-full flex flex-col gap-5 items-center">
              <h2 className="text-xl md:text-3xl font-bold text-[#2F327D]">Aims and <span className="text-[#0FACAC]">Objectives</span></h2>
              <p className="w-[90%] md:w-1/2 text-[#696984]">These are the main aims and objectives of the Undergraduate Degree Programme in Computer Engineering. Take note.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-x-15 gap-y-25 w-[90%] md:w-[70%]">
              {activities.map(activity => (
                <div key={activity.image} className="text-center rounded-xl shadow-xl relative flex flex-col justify-end gap-5 px-8 py-10">
                  <Image className="absolute -top-[15%] left-[40%]" src={activity.image} width={60} height={60} alt="icon"/>
                  <p className="text-md mt-10 font-bold text-[#2F327D]">{activity.paragraph}</p>
                </div>
              ))
              }
            </div>
          </section>

          <section className="text-center flex flex-col items-center gap-20 w-[100%] md:w-full">
            <div className="w-[90%] md:w-full flex flex-col gap-5 items-center">
              <h2 className="md:w-[50%] text-xl md:text-3xl font-bold text-[#2F327D]">Know More About Your <span className="text-[#0FACAC]">Lecturers</span> and staff in the <span className="text-[#0FACAC]">Department</span></h2>
              <p className="w-[90%] md:w-1/2 text-[#696984]">Meet the people responsible for making impact not only in the department, but in the lives of students in the department</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-15 w-[90%] md:w-[80%]">
                {lecturers.map(lecturer => (
                <div key={lecturer.name} className="w-full rounded-xl">
                  <div onClick={() => { setSelected(lecturer); setOpen(true); }} className="cursor-pointer text-center rounded-xl shadow-xl relative flex flex-col justify-end gap-2">
                    <Image className="w-[100%]" src={lecturer.image} width={346} height={434} alt={lecturer.name} />
                    <div className="self-start p-4 text-left h-20">
                      <p className="text-md font-bold text-[#2F327D]">{lecturer.name}</p>
                      <p className="text-[#0FACAC]">{lecturer.title}</p>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
            <LecturerModal lecturer={selected} open={open} onClose={() => setOpen(false)} />
          </section>
        
        </main>

        {/* Footer */}
        <Footer/>
    </div>
  )}
