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
      <main className="flex flex-col gap-20 items-center">
          <section className="w-1/2 text-center flex flex-col gap-3 mt-20">
            <h1 className="text-5xl font-bold">Association of <span className="text-[#0FACAC] ">Computer <br/>Engineering</span> Students</h1>
            <p className="text-xs">Making a difference and inspiring new wave of tech</p>
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
            <div className="flex gap-20 w-full justify-center">
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
      </main>  
    </div>
  );
}
