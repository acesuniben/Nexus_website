'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Home() {
  const pathname = usePathname();
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Hardware Club', href: '/hardware' },
    { name: 'Software Club', href: '/software' },
    { name: 'MHS', href: '/mhs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ]
  const events = [
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' },
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' },
    { href: '/football.png', alt: 'Picture of a Football', head: 'HOD\'s Cup', paragraph: 'A Departmental cup between the different levels from 100L - 500L. They compete for the cup', date: '28 Sept', time: '12:00 pm' }
  ]
  return (
    <div className="">
      <header className="w-full flex justify-around items-center">
        <div>
          <Image src="/logo.png" alt="ACES Logo" width={100} height={100} />
        </div>
        <nav className="w-2/3">
          <ul className="flex justify-evenly">
            {links.map((link) => (
              <li key={link.href}>
                <Link key={link.href} href={link.href} className={clsx(
                  'text-sm font-medium',
                  pathname === link.href ? 'text-blue-500' : 'text-black'
                )}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex flex-col gap-25 items-center">
          <section className="w-1/2 text-center flex flex-col gap-3 mt-20">
            <h1 className="text-5xl font-bold">Association of <span className="text-[#0FACAC] ">Computer <br/>Engineering</span> Students</h1>
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
      </main>  
    </div>
  );
}
