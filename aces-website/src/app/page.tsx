import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const events = [
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' },
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' },
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' }
  ]
  return (
    <div className="">
      <Header/>
      <main className="flex flex-col gap-25 items-center mb-20">
          <section className="w-1/2 text-center flex flex-col gap-3 mt-20">
            <h1 className="text-4xl text-[#2F327D] font-bold">Association of <span className="text-[#0FACAC] ">Computer <br/>Engineering</span> Students</h1>
            <p className="">Making a difference and inspiring new wave of tech</p>
          </section>
          <section className="w-full flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex gap-3 px-5 w-1/2 absolute left-[30%]">
                <div className="bg-[#166D86] text-white w-2/5 rounded-4xl px-10 py-4 text-xl font-bold"><Link key='about' href='/about'>About Us </Link></div>
                <div className="text-[#166D86] border-2  w-2/5 border-[#166D86] bg-white rounded-4xl px-10 py-4 text-xl font-bold"><Link key='contact' href='/contact'>Contact Us </Link></div>
              </div>
              <Image src="/Subtract.png" alt="ACES Students" width={1088} height={549} />
            </div>
          </section>
          <section className="text-center flex flex-col items-center gap-20 w-full">
            <div className="w-full flex flex-col gap-5 items-center">
              <h2 className="text-3xl font-bold">Hardware and <span className="text-[#0FACAC]">Software Club</span></h2>
              <p className="w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div className="flex gap-15 w-full justify-center">
              <div className="relative">
                <Image src="/hardware.png" alt='Printed Circuit Board' height={267} width={476} />
                <div className="absolute left-[12.5%] top-[25%] flex flex-col items-center justify-evenly h-1/2 w-3/4">
                  <p className="text-white text-2xl">Interested in Hardware?</p>
                  <div className="bg-[#166D86] text-white rounded-4xl px-8 py-4 text-xl"><Link key='about' href='/about'>Hardware Club </Link></div>
                </div>
              </div>
              <div className="relative">
                <Image src="/software.png" alt='Printed Circuit Board' height={267} width={476} />
                <div className="absolute left-[12.5%] top-[25%] flex flex-col items-center justify-evenly h-1/2 w-3/4">
                  <p className="text-white text-2xl">Interested in Software?</p>
                  <div className="text-[#166D86] border-2 border-[#166D86] bg-white rounded-4xl px-8 py-4 text-xl"><Link key='about' href='/about'>Software Club </Link></div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center w-full mt-30 mb-30">
            <div className="bg-[#98ff9840] w-3/4 flex items-center rounded-r-[300px] rounded-l-[100px] h-80">
              <div className="w-3/5">
                <Image src="/appscreen.png" alt="ACES Mobile app Mockup" height={931.93} width={851.64}/>
              </div>
              <div className="flex flex-col gap-6 py-15 px-20">
                <h3 className="text-3xl font-bold">Download the <span className="text-[#0FACAC]">ACES</span> Mobile <br/>App</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                <div className="flex gap-8 items-center">
                  <div className="bg-[#166D86] text-white rounded-4xl px-6 py-3 text-xl"><Link key='download' href='/download'>Download</Link></div>
                  <Image src='/Arrow.png' alt="Arrow Icon" width={84} height={87} />
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-10 items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-4xl mb-4">Events and <span className="text-[#0FACAC]">Activities</span></h2>
              <p>See the developments that have occurred to Skillines in the world</p>
            </div>
            <div className="flex justify-center gap-10">
              <div className="flex flex-col gap-4 items-start w-1/3">
                <Image src="/laptop.png" alt="Laptop to indicate an ACES event" width={427} height={226} />
                <div className="text-[#166D86] text-xs font-semibold bg-[#98FF98] px-4 py-1 rounded-xl">EVENTS</div>
                <h3 className="text-2xl font-bold"><span className="text-[#0FACAC]">ACES</span> Week</h3>
                <p className="text-sm">Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                <Link key="read more" href="/" className="underline text-[#0facacbf] font-semibold">Read more</Link>
              </div>
              <div className="flex flex-col gap-5 w-1/3">
                {events.map(item => (
                  <div key={item.href} className="grid grid-cols-[1fr 1fr 1fr 1fr] grid-rows-[1fr 1fr 1fr] gap-x-2 items-center justify-center">
                    <Image key={item.alt} src={item.href} height={133.3} width={166.7} alt={item.alt} className="col-start-1 col-end-3 row-start-1 row-end-4 w-[100%] h-[100%]"/>
                    <h4 key={item.head} className="col-start-3 col-end-5 row-start-1 row-end-2 text-2xl font-semibold">{item.head}</h4>
                    <p key={item.paragraph} className="col-start-3 col-end-5 row-start-2 row-end-3 text-xs">{item.paragraph}</p>
                    <div key={item.date} className="col-start-3 col-end-4 row-start-3 row-end-4 font-bold bg-[#0facac40] text-xs text-center p-2 rounded-2xl text-[#166D86]">{item.date}</div>
                    <div key={item.time} className="col-start-4 col-end-5 row-start-3 row-end-4  font-bold border-1 border-[#2F327D] text-xs text-center p-2 rounded-2xl text-[#166D86]">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="flex justify-around items-center mt-10 mb-10">
            <div className="w-2/5">
                <div className="relative flex flex-col gap-10 justify-evenly items-start w-full">
                  <Image src='/ela.png' height={328.73} width={480.34} alt="Background design for Ela" className="w-[100%] h-[90%] absolute top-0 left-0"/>
                  <h2 className="text-3xl font-bold mt-20"><span className="text-[#0FACAC]">ELA</span> Made Easy</h2>
                  <p className="text-sm">ELA Made Easy With ELABORATE. Having issues with ELA? Elaborate got you</p>
                  <div className="text-white  bg-[#166D86] px-6 py-2 rounded-3xl"><a href="https://www.elaborate.com.ng">Visit Now</a></div>
                </div>
            </div>
            <div>
                <Image src='/elaborate.png' width={596.85} height={513.33} alt="A screenshot of the Elaborate platform" className=""/>
            </div>
          </section>
          <section className="flex justify-center gap-20 items-center w-full mb-10">
            <div className="w-1/3 flex flex-col gap-6">
              <h2 className="text-[#2F327D] text-5xl font-bold">Pay your <span className="text-[#0FACAC]">ACES</span> and <span className="text-[#0FACAC]">ELA</span> Dues</h2>
              <p className="text-md">To improve the department and to ensure activities like fresher’s welcome, HOD’s Cup and others are able to be achieved.</p>
              <p className="text-md">paying your ELA Dues shows how important this department is to you.</p>
            </div>
            <div className="w-1/3 relative">
              <Image src="/wallet.svg" height={466.67} width={550.07} alt="Wallet Icon"/>
              <div className="flex flex-col gap-5 bg-white border-l-8 border-[#0FACAC] px-6 py-8  absolute top-[70%] left-[20%] w-[100%] rounded-xl shadow-xl">
                <div className="flex gap-2 items-center text-sm">
                  <Image src="/contact.svg" width={52.67} height={52.67} alt="Contact Icon"/>
                  <p>Contact any executive contact below or <br/> kindly reach the secetariat</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center text-sm">
                    <Image src="/call.svg" width={52.67} height={52.67} alt="Call Icon"/>
                    <p>08024568653</p>
                  </div>
                  <div className="flex gap-4 items-center text-sm">
                    <Image src="/call.svg" width={52.67} height={52.67} alt="Call Icon"/>
                    <p>08024568653</p>
                  </div>
                </div>
              </div>
            </div> 
          </section>
          <section className="w-full flex justify-evenly mt-15">
            <div className="flex flex-col gap-8 w-1/5 items-start">
              <h2 className=" text-[#2F327D] text-4xl font-bold">Departmental <span className="text-[#0FACAC] ">Timetable</span></h2>
              <p>Get used to your timetable and familiarize yourself with it so you don’t miss lectures and so you can plan your time effectively</p>
              <div className="p-4 bg-[#166D86] text-white rounded-4xl">Check it out</div>
            </div>
            <div className="w-2/5">
              <Image src="/timetable.svg" alt="Icon depicting Timetable" width={590.03} height={326.08}/>              
            </div>
          </section>
          <section className="flex justify-evenly">
            <div className="flex flex-col gap-4 relative w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={332.11} height={64.99} alt="pointers illustration" className="absolute top-0 -left-2 -z-0"/>
              <h2 className="text-[#0FACAC] font-bold text-4xl relative">About <span className="text-[#2F327D] z-10">Us</span></h2>
              <p>Computer Engineering is a department in the faculty of Engineering, university of Benin. It consists of five (5) levels from 100L - 500L. Recently the department had a new HOD and consists of amazing lecturers</p>
              <div className="rounded-4xl py-2 px-4 bg-[#166D86] text-white">
                <Link href="/about">About Us</Link>
              </div>
            </div>
            <div className="w-2/5">
              <Image src="/classroom.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom"/>
            </div>
          </section>
          <section className="w-full flex justify-center items-center">
            <div className="relative w-[90%]">
              <Image src="/subscribe.svg" height={234.135} width={1016.67} alt="Newsletter sign-up background" className="w-full"/>
              <div className="absolute top-[25%] left-[20%] flex flex-col gap-6 items-center w-[60%]">
                <h2 className="text-[#2F327D] font-bold text-3xl text-center w-[75%]">Subscribe to stay up to date with <span className=" text-[#0FACAC]">ACES</span> Uniben</h2>          
                <div className="bg-white rounded-4xl py-2 px-4 w-[70%]">
                  <form className="flex justify-between items-center w-full">
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      name="email"
                      className="px-2 py-1 w-focus:outline-none focus:ring-2 focus:ring-[#0FACAC] focus:border-transparent w-[80%]"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-[#166D86] text-white rounded-4xl py-2 px-4 hover:bg-[#0FACAC] transition-colors duration-200 font-medium"
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
