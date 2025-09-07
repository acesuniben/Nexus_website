import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Software() {
  const niches = [
    {title: "PCB Design and", name: "Development", link: "#", src: "/pcb-design.png"},
    {title: "Circuit Design &", name: "Prototyping", link: "#", src: "/circuit-design.png"},
    {title: "Soldering &", name: "Assembling", link: "#", src: "/soldering.png"},
    {title: "Smart Design", name: "Implementation", link: "#", src: "/smart-design.png"},
  ]
  const governors = [
    {name: "Bassey Favour", role: "Hardware Governor", description: "400L CPE Student. A hardware Enthusiast and Robotics lover. Builds, designs and create innovative tech solutions", picture: "/maro.png", facebook: "#", github: "#", linkedIn: "#"},
    {name: "Oghosa Derick Osarobo", role: "Deputy Governor", description: "300L CPE Student. Passionate about Electronics, IOT, hardware design and programming. Enjoys building practical solutions.", picture: "/OghosaDerick.png", facebook: "#", github: "#", linkedIn: "#"},
    {name: "Efeteyan E. Miracle", role: "Deputy Governor", description: "300L Student of CPE. A growing tech lover with interest in electronics and Embedded Systems", picture: "/david.png", facebook: "#", github: "#", linkedIn: "#"},
  ]
  const activities = [
    {picture: "/research-icon.png", title: "Research", paragraph: "The club engage in different Classwork and assignment to research on different components and projects that develop them individually and also work and learn with each other."},
    {picture: "/pcb-icon.png", title: "Building Projects", paragraph: "The club works on a lot of projects and also ensure that the members of the club participate so that they can be increase their knowlegde and skills in different areas."},
    {picture: "/mentorship.svg", title: "Mentorships", paragraph: "The Governors mentor the members of the club and direct them on the way to go and also to ensure that they are consistent and improve individually"},
  ]
  return ( 
    <div className="">
        <Header/>
        <main className="flex flex-col gap-16 md:gap-32 items-center mb-20">
          {/* Hero Section */}
          <section className="w-[90%] md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20 px-4">
            <h1 className="text-2xl md:text-4xl text-[#2F327D] font-bold leading-tight">Know more about the <span className="text-[#0FACAC]">Lecturers</span><br className="hidden md:block"/> and the <span className="text-[#0FACAC]">department</span> as a whole.</h1>
            <p className="text-sm md:text-base text-gray-600">Know more about us the great department of computer Engineering and also the lecturers and staff. </p>
          </section>

          {/* Hero Image with Navigation Buttons */}
          <section className="w-full flex flex-col items-center text-center px-4">
            <div className="relative w-full max-w-6xl">
              <div className="flex gap-1 md:gap-3 px-2 md:px-5 w-1/2 absolute left-[30%] top-0 md:top-auto z-10">
                <div className="bg-[#166D86] text-white w-2/5 rounded-full md:rounded-4xl px-2 py-1 md:px-10 md:py-4 text-xs md:text-xl font-bold"><Link key='about' href='/about'>About Us</Link></div>
                <div className="text-[#166D86] border-2 w-2/5 border-[#166D86] bg-white rounded-full md:rounded-4xl px-2 py-1 md:px-10 md:py-4 text-xs md:text-xl font-bold"><Link key='contact' href='/contact'>Contact Us</Link></div>
              </div>
              <Image src="/Subtract-Hardware.png" alt="ACES Students" width={1088} height={549} className="w-full h-auto" />
            </div>
          </section>

          {/* About the Club Section */}
          <section className="flex flex-col-reverse md:flex-row gap-5 md:gap-0 justify-between md:justify-evenly items-center px-4">
            <div className="flex flex-col gap-2 relative w-[90%] md:w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={474.67} height={64.99} alt="pointers illustration" className="absolute -top-12 left-7 md:-top-8 md:-left-2 -z-0"/>
              <h2 className="text-[#2F327D] font-bold text-2xl md:text-4xl relative">About the<span className="text-[#0FACAC] z-10"> Club</span></h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">The ACES Hardware Club was introduced by the <span className="text-[#0FACAC]">New Age Executives 22/23</span>. Then it was inaugurated by <span className="text-[#0FACAC]">Emeritus President of Golden Age Executives 23/24 by Victor Warikobo-West</span>. They saw the importance of engaging the students of the department of Computer Engineering to ensure that they are have an area of interest and ensure that they are well grounded in whatever path they choose. The club is ran by the Appointed (Admin and Technical) Governors.</p>
            </div>
            <div className="w-[90%] md:w-2/5">
              <Image src="/softGroup.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom" className="w-full h-auto rounded-lg"/>
            </div>
          </section>

        
        
        </main>

        {/* Footer */}
        <Footer/>
    </div>
  )}
