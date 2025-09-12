import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import EventSection from "@/components/EventSection";

export default function Home() {
  return (
    <div className="">
      <Header/>
      <main className="flex flex-col gap-15 md:gap-25 items-center mb-10 md:mb-20">
          <section className="md:w-1/2 text-center flex flex-col gap-1 md:gap-3 mt-10 md:mt-20">
            <h1 className="text-3xl md:text-5xl text-[#2F327D] font-bold">Association of <span className="text-[#0FACAC] ">Computer <br/>Engineering</span> Students</h1>
            <p className="w-[80%] mx-auto text-[#696984]">Making a difference and inspiring Students so that they develop themselves and make impact in world at large.</p>
          </section>
          <section className="w-full flex flex-col items-center text-center w-[90%]">
            <div className="relative px-5 md:px-0">
              <div className="hidden md:flex gap-1 md:gap-3 px-2 md:py-0 md:px-5 w-1/2 absolute left-[30%] top-[0%]">
                <div className="bg-[#166D86] text-white w-2/5 rounded-4xl md:px-10 md:py-4 text-xs md:text-xl font-bold p-0.5"><Link key='about' href='/about'>About Us </Link></div>
                <div className="text-[#166D86] border-2  w-2/5 border-[#166D86] bg-white rounded-4xl p-0.5 md:px-10 md:py-4 text-xs md:text-xl font-bold"><Link key='contact' href='/contact'>Contact Us </Link></div>
              </div>
              <Image className="hidden md:block" src="/Subtract.png" alt="ACES Students" width={1088} height={549} />
              <Image className="md:hidden w-[100%]" src="/mobheader.png" alt="ACES Students" width={600} height={215} />
            </div>
          </section>
          <section className="text-center flex flex-col items-center gap-10 md:gap-20 w-[90%] md:w-full">
            <div className="w-full flex flex-col gap-5 items-center">
              <h2 className="text-2xl text-[#2F327D] md:text-3xl font-bold mx-auto md:mx-none">Hardware and <span className="text-[#0FACAC]">Software Club</span></h2>
              <p className="md:w-1/2 text-[#696984]">These are the various clubs that ACES community have. Are you interested in any? Check them out</p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 md:gap-15 w-full justify-center">
              <div className="relative">
                <Image src="/hardware.png" alt='Printed Circuit Board' height={267} width={476} />
                <div className="absolute left-[12.5%] top-[25%] flex flex-col items-center justify-evenly h-1/2 w-3/4">
                  <p className="text-white text-xl md:text-2xl">Interested in Hardware?</p>
                  <div className="bg-[#166D86] text-white rounded-4xl px-4 py-2 text-xl"><Link key='about' href='/about'>Hardware Club </Link></div>
                </div>
              </div>
              <div className="relative">
                <Image src="/software.png" alt='Printed Circuit Board' height={267} width={476} />
                <div className="absolute left-[12.5%] top-[25%] flex flex-col items-center justify-evenly h-1/2 w-3/4">
                  <p className="text-white text-xl md:text-2xl">Interested in Software?</p>
                  <div className="text-[#166D86] border-2 border-[#166D86] bg-white rounded-4xl px-4 py-2 text-xl"><Link key='about' href='/about'>Software Club </Link></div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col md:items-center w-full mt-30 mb-10 md:mb-30">
            <div className="md:bg-[#98ff9840] gap-30 md:gap-0 w-[100%] md:w-3/4 flex flex-col md:flex-row md:justify-start md:items-center rounded-r-[300px] rounded-l-[100px] md:h-70">
              <div className="w-full flex items-center justify-start md:block  bg-[#98ff9840] md:bg-transparent rounded-r-[300px] rounded-l-[100px] h-45 md:h-auto">
                <Image className="justify-center" src="/appscreen.png" alt="ACES Mobile app Mockup" height={931.93} width={851.64}/>
              </div>
              <div className="flex flex-col w-[90%] mx-auto md:mx-0 md:w-auto gap-4 md:justify-evenly md:py-25 md:px-20 self-left relative">
                <h3 className="text-2xl md:text-3xl font-bold text-[#2F327D]">Download the <span className="text-[#0FACAC]">ACES</span> Mobile App</h3>
                <p className="text-[#565886]">Want have a better experience? Check out the ACES Mobile app and have access to resources, tools that will really help you as a student.</p>
                <div className="flex gap-8 items-center">
                  <div className="bg-[#166D86] text-white rounded-4xl px-4 py-2 text-md"><a key='download' href='https://download.acesuniben.org'>Download</a></div>
                  <Image src='/Arrow.png' alt="Arrow Icon" width={42} height={44} />
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-10 items-center w-[90%]">
            <div className="flex flex-col items-center w-[100%]">
              <h2 className="font-bold text-3xl md:text-4xl mb-4 text-[#2F327D]">Events and <span className="text-[#0FACAC]">Activities</span></h2>
              <p className="text-center text-[#565886]">Not Up to date? Check out the Activities and events ACES have planned out.</p>
            </div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-10 w-[100%]">
              <EventSection />
            </div>
          </section>
          <section className="flex flex-col-reverse md:flex-row justify-around items-center mt-10 mb-10">
            <div className="w-[90%] md:w-2/5">
                <div className="relative flex flex-col gap-10 justify-evenly items-start w-[90%] md:w-full">
                  <Image src='/ela.png' height={328.73} width={480.34} alt="Background design for Ela" className="w-[90%] md:w-full h-[90%] absolute top-0 left-0"/>
                  <h2 className="text-3xl font-bold mt-20 text-[#2F327D]"><span className="text-[#0FACAC]">ELA</span> Made Easy</h2>
                  <p className="text-sm text-[#565886]">ELA Made Easy With ELABORATE. Having issues with ELA? Elaborate got you.</p>
                  <div className="text-white  bg-[#166D86] px-4 py-2 rounded-3xl"><a href="https://www.elaborate.com.ng">Visit Now</a></div>
                </div>
            </div>
            <div className="w-[90%] md:w-full">
                <Image src='/elaborate.png' width={596.85} height={513.33} alt="A screenshot of the Elaborate platform" className=""/>
            </div>
          </section>
          <section className="flex flex-col md:flex-row justify-center gap-20 items-center w-full mb-10">
            <div className="w-[90%] md:w-1/3 flex flex-col gap-6">
              <h2 className="text-[#2F327D] text-5xl font-bold">Pay your <span className="text-[#0FACAC]">ACES</span> and <span className="text-[#0FACAC]">ELA</span> Dues</h2>
              <p className="text-md text-[#565886]">To improve the department and to ensure activities like fresher’s welcome, HOD’s Cup and others activities are able to be achieved.</p>
              <p className="text-md text-[#565886]">Paying your ELA Dues shows how important this department is to you.</p>
              <div className="text-white  bg-[#166D86] px-4 py-2 rounded-3xl self-start"><Link href="/dues">Know How</Link></div>
            </div>
            <div className="w-[90%] md:w-1/3 relative text-[#2F327D]">
              <Link href="/dues">
                <Image src="/wallet.svg" height={466.67} width={550.07} alt="Wallet Icon"/>
              </Link>
              <div className="flex flex-col gap-5 bg-white border-l-8 border-[#0FACAC] px-6 py-8  absolute top-[70%] left-[10%] md:left-[20%] w-[90%] md:w-[100%] rounded-xl shadow-xl">
                <div className="flex gap-2 items-center text-sm">
                  <Image src="/contact.svg" width={40} height={40} alt="Contact Icon"/>
                  <p>Contact any executive contact below or kindly reach the secetariat</p>
                </div>
                <div className="flex gap-4 md:gap-0 md:justify-between">
                  <a href="tel:08134408004">
                    <div className="flex gap-1 md:gap-4 items-center text-sm">
                      <Image src="/call.svg" width={40} height={40} alt="Call Icon"/>
                      <p>08134408004</p>
                    </div>
                  </a>
                  <a href="tel:09134971826">
                    <div className="flex gap-1 md:gap-4 items-center text-sm">
                      <Image src="/call.svg" width={40} height={40} alt="Call Icon"/>
                      <p>09134971826</p>
                    </div>
                  </a>
                </div>
              </div>
            </div> 
          </section>
          <section className="w-[90%] md:w-full mx-auto flex flex-col md:flex-row justify-between md:justify-around mt-15">
            <div className="flex flex-col gap-8 w-[100%] md:w-1/5 items-start">
              <h2 className=" text-[#2F327D] text-4xl font-bold">Departmental <span className="text-[#0FACAC] ">Timetable</span></h2>
              <p className="text-[#565886]">Get used to your timetable and familiarize yourself with it so you don’t miss lectures and so you can plan your time effectively.</p>
              <div className="px-4 py-2 bg-[#166D86] text-white rounded-4xl"><Link href="/timetable">Check it out</Link></div>
            </div>
            <div className="w-[100%] md:w-2/5 self-end md:self-start">
              <Image src="/timetable.svg" alt="Icon depicting Timetable" width={590.03} height={326.08}/>              
            </div>
          </section>
          <section className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 md:justify-evenly items-center">
            <div className="flex flex-col gap-4 relative w-[90%] md:w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={332.11} height={64.99} alt="pointers illustration" className="absolute -top-8 -left-2 -z-0"/>
              <h2 className="text-[#0FACAC] font-bold text-4xl relative">About <span className="text-[#2F327D] z-10">Us</span></h2>
              <p className="text-[#565886]">Computer Engineering is a department in the faculty of Engineering, University Of Benin. It consists of five (5) levels from 100L - 500L. Recently the department had a new HOD and consists of amazing lecturers, alumni and students.</p>
              <div className="rounded-4xl py-2 px-4 bg-[#166D86] text-white">
                <Link href="/about">About Us</Link>
              </div>
            </div>
            <div className="w-[90%] md:w-2/5">
              <Image src="/classroom.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom"/>
            </div>
          </section>
          
          <section className="w-full flex justify-center items-center">
            <div className="relative w-[90%]">
              <Image src="/subscribe.svg" height={712.5} width={1525} alt="Newsletter sign-up background" className="hidden md:block w-full"/>
              <Image src="/mobsubscribe.svg" height={188} width={356} alt="Newsletter sign-up background" className=" md:hidden w-full"/>
              <div className="absolute pt-1 top-[25%] md:top-[25%] left-[5%] md:left-[20%] flex flex-col gap-2 md:gap-6 items-center w-[90%] md:w-[60%]">
                <h2 className="text-[#2F327D] font-bold text-md md:text-3xl text-center w-[75%]">Subscribe to stay up to date with <span className=" text-[#0FACAC]">ACES</span> Uniben</h2>          
                <div className="bg-white text-sm md:text-lg rounded-4xl px-1 py-1 md:py-2 md:px-4 w-full md:w-[70%]">
                  <form className="flex justify-between text-sm md:text-lg items-center w-full">
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      name="email"
                      className="text-xs px-1 py-0 md:px-2 md:py-1 w-focus:outline-none focus:ring-2 focus:ring-[#0FACAC] focus:border-transparent w-[80%]"
                      required
                    />
                    <button 
                      type="submit"
                      className="text-xs bg-[#166D86] text-white rounded-4xl p-1 md:py-2 md:px-4 hover:bg-[#0FACAC] transition-colors duration-200 font-medium"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>    
            </div>
          </section>
      </main>
      {/* Footer */}
      <Footer/>
  
    </div>
  );
}
