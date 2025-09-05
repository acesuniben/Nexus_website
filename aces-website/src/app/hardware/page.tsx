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
        <main className="flex flex-col gap-10 md:gap-25 items-center mb-20">
          {/* Hero Section */}
          <section className="w-[90%] md:w-2/3 text-center flex flex-col gap-3 mt-10 md:mt-20 px-4">
            <h1 className="text-2xl md:text-4xl text-[#2F327D] font-bold leading-tight">Association of Computer Engineering <br className="hidden md:block"/>Students <span className="text-[#0FACAC]">Hardware Club</span></h1>
            <p className="text-sm md:text-base text-gray-600">Making a difference and inspiring new wave of hardware engineers</p>
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
          <section className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:justify-evenly items-center px-4">
            <div className="flex flex-col gap-2 relative w-[90%] md:w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={474.67} height={64.99} alt="pointers illustration" className="absolute -top-12 left-7 md:-top-8 md:-left-2 -z-0"/>
              <h2 className="text-[#2F327D] font-bold text-2xl md:text-4xl relative">About the<span className="text-[#0FACAC] z-10"> Club</span></h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">The ACES Hardware Club was introduced by the <span className="text-[#0FACAC]">New Age Executives 22/23</span>. Then it was inaugurated by <span className="text-[#0FACAC]">Emeritus President of Golden Age Executives 23/24 by Victor Warikobo-West</span>. They saw the importance of engaging the students of the department of Computer Engineering to ensure that they are have an area of interest and ensure that they are well grounded in whatever path they choose. The club is ran by the Appointed (Admin and Technical) Governors.</p>
            </div>
            <div className="w-[90%] md:w-2/5">
              <Image src="/softGroup.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom" className="w-full h-auto rounded-lg"/>
            </div>
          </section>

          {/* Hardware Niches/Areas Section */}
          <section className="text-center flex flex-col items-center gap-10 md:gap-20 w-full px-4">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D]">Explore our Different <span className="text-[#0FACAC]">Niches</span></h2>
              <p className="w-[90%] md:w-1/2 text-sm md:text-base text-gray-600">There are different areas in hardware that one can venture into. These are the ones the hardware club are working on. Choose what suits you best.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full max-w-4xl">
              {niches.map(niche => (
                <div key={niche.title} className="flex justify-between gap-2 bg-white rounded-2xl md:rounded-4xl shadow-xl p-6 md:p-10 w-full">
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[#2F327D] text-lg md:text-xl text-left font-medium">{niche.title} <br/> {niche.name}</h4>
                  </div>
                  <div className="self-center flex-shrink-0">
                    <Image src={niche.src} alt={niche.title + " icon"} width={80} height={60} className="md:w-[113.5px] md:h-[83.5px]"/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Time and Location Information Section */}
          <section className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full max-w-6xl mx-auto px-4">
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D]">
                Worried about <span className="text-[#0FACAC]">time and location?</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Don't worry no need to panic and be worried about where the classes are held and the time these classes are held. The details are below.
              </p>
              
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0FACAC] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base">
                      400L CPE Class, Faculty of Engineering, University of Benin, Ugbowo.
                    </p>
                  </div>
                </div>

                {/* Schedule and Time - Stacked on mobile */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0FACAC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base">Every Saturday</p>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0FACAC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                      </svg>
                    </div>
                    <p className="text-[#2F327D] font-semibold text-sm md:text-base">9am - 12pm</p>
                  </div>
                </div>

                {/* Contact Numbers - Stacked on mobile */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0FACAC] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                      </svg>
                    </div>
                    <span className="text-[#2F327D] font-medium text-sm md:text-base">08024568653</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0FACAC] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                      </svg>
                    </div>
                    <span className="text-[#2F327D] font-medium text-sm md:text-base">08024568653</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
              <Image
                src="/location-hardware.png"
                alt="Student with curly hair and glasses"
                width={400}
                height={300}
                className="max-w-full h-auto w-[280px] md:w-[400px]"
              />
            </div>
          </section>

          {/* Network with ACES Hardware Community Section */}
          <section className="flex items-center gap-12 w-full max-w-6xl mx-auto">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-12">
                <div className="w-1/2">
                  <Image
                    src="/network-hardware.png"
                    alt="Network with ACES Hardware Community"
                    width={500}
                    height={400}
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className="w-1/2 space-y-6">
                  <h2 className="text-4xl font-bold text-[#2F327D]">
                    Network with ACES<br />
                    Hardware Community
                  </h2>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Communicate with like-minds. Associate with other people that are willing to grow and to also make impact in the department of Computer Engineering and the world at large. Join the Group chat and enjoy all these benefits.
                  </p>
                  
                  <button className="bg-[#166D86] hover:bg-[#0e9999] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Join the Group Chat
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile App Promotion Section */}
          <section className="flex items-center w-[100%] mt-10">
              <div className="w-2/5">
                <Image src="/softapp.png" alt="ACES Mobile app Mockup" height={931.93} width={851.64}/>
              </div>
              <div className="flex flex-col gap-6 py-15 px-20 w-3/5">
                <h3 className="text-3xl font-bold text-[#2F327D]">Learn More with the <span className="text-[#0FACAC]">ACES Mobile App</span> Mobile <br/>App</h3>
                <p>Login to the mobile app and have access to more resources that will help in your <span className="text-[#0FACAC]">hardware</span> journey. It is important so that grow in knowledge based on your niche.</p>
                <p>Download now and enjoy the benefits that come with it.</p>
                <div className="flex gap-8 items-center">
                  <div className="bg-[#166D86] text-white rounded-4xl px-8 py-3 text-xl"><Link key='download' href='/download'>Download Now</Link></div>
                  <Image src='/Arrow.png' alt="Arrow Icon" width={84} height={67} />
                </div>
              </div>
          </section>

          {/* Hardware Club Governors Section */}
          <section className="py-8 md:py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-2 md:mb-4">
                ACES Hardware Club <span className="text-[#0FACAC]">Governors</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
                These are the people that are in charge and also run the activities of the hardware club. Curious? Look below.
              </p>
              
              <div className="space-y-6 md:space-y-10">
                {/* First two governors - Stack on mobile, side by side on desktop */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center">
                  {governors.slice(0, 2).map(governor => (
                    <div key={governor.name} className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-4 md:p-6 w-full max-w-lg mx-auto">
                      <div className="flex justify-center md:justify-start mb-4 md:mb-0 md:mr-4">
                        <Image 
                          src={governor.picture} 
                          width={120} 
                          height={120} 
                          alt={"Picture of the " + governor.role + " " + governor.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between text-center md:text-left flex-1">
                        <div className="mb-3 md:mb-4">
                          <h3 className="text-base md:text-lg font-semibold text-[#2F327D] mb-1">{governor.name}</h3>
                          <h4 className="text-sm md:text-base font-semibold text-[#0FACAC]">{governor.role}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-1">{governor.description}</p>
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
                          <a href={governor.facebook} className="hover:opacity-70 transition-opacity">
                            <Image src="/facebook.svg" width={18} height={18} alt="Facebook Icon" className="w-4 h-4 md:w-5 md:h-5"/>
                          </a>
                          <a href={governor.github} className="hover:opacity-70 transition-opacity">
                            <Image src="/github.svg" width={18} height={18} alt="Github Icon" className="w-4 h-4 md:w-5 md:h-5"/>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Third governor centered */}
                <div className="flex justify-center">
                  {governors.slice(2, 3).map(governor => (
                    <div key={governor.name} className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-4 md:p-6 w-full max-w-lg">
                      <div className="flex justify-center md:justify-start mb-4 md:mb-0 md:mr-4">
                        <Image 
                          src={governor.picture} 
                          width={120} 
                          height={120} 
                          alt={"Picture of the " + governor.role + " " + governor.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between text-center md:text-left flex-1">
                        <div className="mb-3 md:mb-4">
                          <h3 className="text-base md:text-lg font-semibold text-[#2F327D] mb-1">{governor.name}</h3>
                          <h4 className="text-sm md:text-base font-semibold text-[#0FACAC]">{governor.role}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-1">{governor.description}</p>
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
                          <a href={governor.facebook} className="hover:opacity-70 transition-opacity">
                            <Image src="/facebook.svg" width={18} height={18} alt="Facebook Icon" className="w-4 h-4 md:w-5 md:h-5"/>
                          </a>
                          <a href={governor.github} className="hover:opacity-70 transition-opacity">
                            <Image src="/github.svg" width={18} height={18} alt="Github Icon" className="w-4 h-4 md:w-5 md:h-5"/>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Club Activities Section */}
          <section className="py-8 md:py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-2 md:mb-4">
                  Club <span className="text-[#0FACAC]">Activities</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  These are the few activities that are done in the hardware club. Ensure you participate.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-4 md:p-6 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
                      <Image 
                        src="/pcb-design.png" 
                        alt="PCB Design" 
                        width={80} 
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2F327D] mb-2 md:mb-3">PCB Design</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Learn how to design professional printed circuit boards using industry-standard tools and techniques.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-4 md:p-6 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
                      <Image 
                        src="/soldering.png" 
                        alt="Soldering" 
                        width={80} 
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2F327D] mb-2 md:mb-3">Soldering</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Master the art of soldering components and build your own electronic circuits from scratch.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-4 md:p-6 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
                      <Image 
                        src="/circuit-design.png" 
                        alt="Circuit Design" 
                        width={80} 
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2F327D] mb-2 md:mb-3">Circuit Design</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Design and simulate electronic circuits for various applications and projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile App Promotion Section */}
          <section className="py-8 md:py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="w-full md:w-2/5 flex justify-center">
                  <Image 
                    src="/softapp.png" 
                    alt="ACES Mobile app Mockup" 
                    width={400} 
                    height={400}
                    className="max-w-full h-auto w-[250px] md:w-[400px]"
                  />
                </div>
                <div className="w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-3xl font-bold text-[#2F327D]">
                    Learn More with the <span className="text-[#0FACAC]">ACES Mobile App</span>
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Login to the mobile app and have access to more resources that will help in your <span className="text-[#0FACAC]">hardware</span> journey. It is important so that grow in knowledge based on your niche.
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    Download now and enjoy the benefits that come with it.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center md:justify-start">
                    <Link 
                      href='/download' 
                      className="bg-[#166D86] hover:bg-[#0e4a5a] text-white rounded-full px-6 md:px-8 py-3 text-base md:text-xl font-semibold transition-colors duration-300"
                    >
                      Download Now
                    </Link>
                    <Image 
                      src='/Arrow.png' 
                      alt="Arrow Icon" 
                      width={60} 
                      height={48}
                      className="w-12 h-10 md:w-16 md:h-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Software Club CTA Section */}
          <section className="w-full flex justify-center items-center px-4 md:px-0">
            <div className="relative w-full md:w-[90%]">
              <Image src="/cta-software.png" height={234.135} width={1016.67} alt="Newsletter sign-up background" className="w-full"/>
              <div className="absolute inset-0 flex items-center justify-center md:top-[30%] md:left-[20%] md:justify-start">
                <div className="flex flex-col md:flex-row gap-4 md:gap-20 items-center md:items-start w-full md:w-[60%] p-4 md:p-0">
                  <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-10 items-center md:items-start text-center md:text-left">
                    <p className="text-[#2F327D] text-lg md:text-3xl font-bold">
                      Interested in <span className="text-[#0FACAC]">Software?</span> The Software Club is Available for you. Check it out.
                    </p>
                    <div className="text-white bg-[#166D86] px-4 py-2 md:px-6 md:py-2 rounded-3xl">
                      <Link href="/software">Software Club</Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Image src="/board.svg" width={174.31} height={227.61} alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer/>
    </div>
  )}
