'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Software() {
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
  const niches = [
    {title: "App", name: "Development", link: "#", src: "/app.svg"},
    {title: "Web", name: "Development", link: "#", src: "/web.svg"},
    {title: "Cyber", name: "Security", link: "#", src: "/cyber.svg"},
    {title: "Product", name: "Design", link: "#", src: "/product.svg"},
    {title: "Artificial", name: "Intelligence", link: "#", src: "/artificial.svg"},
    {title: "Data", name: "Science", link: "", src: "/data.svg"},
  ]
  const governors = [
    {name: "Ogbaudu Oghenemaro", role: "Technical Governor", description: "Software Engineer, Front-end Developer and Cyber-Security Expert", picture: "/maro.png", facebook: "#", github: "#", linkedIn: "#"},
    {name: "Onwuka David", role: "Administrative Governor", description: "Software Engineer, Blockchain Developer and Technical Writer", picture: "/david.png", facebook: "#", github: "#", linkedIn: "#"},
  ]
  const activities = [
    {picture: "/hackathon.svg", title: "Hackathons", paragraph: "The club engage in different hackathons and also organise in house hackathons so that members of the club can compete as well to improve their skills"},
    {picture: "/webinar.svg", title: "Webinars", paragraph: "The club organises webinars on twitter, zoom, Twitter (X) so enlighten and to educate the members on different niches "},
    {picture: "/mentorship.svg", title: "Mentorships", paragraph: "The Governors mentor the members of the club and direct them on the way to go and also to ensure that they are consistent and improve individually"},
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
        <main className="flex flex-col gap-25 items-center mb-20">
          <section className="w-2/3 text-center flex flex-col gap-3 mt-20">
            <h1 className="text-4xl text-[#2F327D] font-bold">Association of Computer Engineering <br/>Students <span className="text-[#0FACAC] ">Software Club</span></h1>
            <p className="">Making a difference and inspiring new wave of tech</p>
          </section>
          <section className="w-full flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex gap-3 px-5 w-1/2 absolute left-[30%]">
                <div className="bg-[#166D86] text-white w-2/5 rounded-4xl px-10 py-4 text-xl font-bold"><Link key='about' href='/about'>About Us </Link></div>
                <div className="text-[#166D86] border-2  w-2/5 border-[#166D86] bg-white rounded-4xl px-10 py-4 text-xl font-bold"><Link key='contact' href='/contact'>Contact Us </Link></div>
              </div>
              <Image src="/Add.png" alt="ACES Students" width={1088} height={549} />
            </div>
          </section>
          <section className="flex justify-evenly">
            <div className="flex flex-col gap-2 relative w-2/5 items-start justify-evenly">
              <Image src="/pointers.svg" width={474.67} height={64.99} alt="pointers illustration" className="absolute -top-8 -left-2 -z-0"/>
              <h2 className="text-[#2F327D] font-bold text-4xl relative">About the<span className="text-[#0FACAC] z-10"> Club</span></h2>
              <p>The ACES Hardware Club was introduced by the <span className="text-[#0FACAC]">New Age Executives 22/23</span>. Then it was inaugurated by <span className="text-[#0FACAC]">Emeritus President of Golden Age Executives 23/24 by Victor Warikobo-West</span>. They saw the importance of engaging the students of the department of Computer Engineering to ensure that they are have an area of interest and ensure that they are well grounded in whatever path they choose. The club is ran by the Appointed (Admin and Technical) Governors.</p>
            </div>
            <div className="w-2/5">
              <Image src="/softGroup.png" height={359.33} width={498.67} alt="Picture of students listening to their teacher in their classroom"/>
            </div>
          </section>
          <section className="text-center flex flex-col items-center gap-20 w-full">
            <div className="w-full flex flex-col gap-5 items-center">
              <h2 className="text-3xl font-bold text-[#2F327D]">Explore our Different <span className="text-[#0FACAC]">Niches</span></h2>
              <p className="w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div className="grid grid-cols-2 gap-10">
              {niches.map(niche => (
                <div key={niche.title} className="flex justify-between gap-2 bg-white rounded-4xl shadow-xl p-10 w-100 h-50">
                  <div className="flex flex-col justify-between">
                    <h4 className="text-[#2F327D] text-xl text-left font-medium">{niche.title} <br/> {niche.name}</h4>
                    <div ><a className="flex gap-2 items-center text-sm font-semibold" href={niche.link}><Image src="Icon.svg" alt="navigation arrow" width={30} height={30}/> <p>Join Now</p></a></div>
                  </div>
                  <div className="self-center">
                    <Image src={niche.src} alt={niche.title + " icon"} width={113.5} height={83.5}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex items-center w-[100%] mt-10">
              <div className="w-2/5">
                <Image src="/softapp.png" alt="ACES Mobile app Mockup" height={931.93} width={851.64}/>
              </div>
              <div className="flex flex-col gap-6 py-15 px-20 w-3/5">
                <h3 className="text-3xl font-bold text-[#2F327D]">Learn More with the <span className="text-[#0FACAC]">ACES Mobile App</span> Mobile <br/>App</h3>
                <p>Login to the mobile app and have access to more resources that will help in your software journey. It is important so that grow in knowledge based on your niche.</p>
                <p>Download now and enjoy the benefits that come with it.</p>
                <div className="flex gap-8 items-center">
                  <div className="bg-[#166D86] text-white rounded-4xl px-8 py-3 text-xl"><Link key='download' href='/download'>Download Now</Link></div>
                  <Image src='/Arrow.png' alt="Arrow Icon" width={84} height={67} />
                </div>
              </div>
          </section>

          <section className="text-center flex flex-col items-center gap-20 w-full">
            <div className="w-full flex flex-col gap-8 items-center">
              <h2 className="text-3xl font-bold text-[#2F327D]">ACES Software Club <span className="text-[#0FACAC]">Governors</span></h2>
              <p className="w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div className="grid grid-cols-2 gap-10 w-[80%]">
              {governors.map(governor => (
                <div key={governor.name} className="flex text-left px-4 py-1 shadow-lg rounded-xl">
                  <div><Image src={governor.picture} width={331.72} height={331.72} alt={"Picture of the " + governor.role + " " + governor.name}/></div>
                  <div className="flex flex-col justify-around px-2">
                    <div>
                      <h3 className="text-md font-semibold text-[#2F327D]">{governor.name}</h3>
                      <h4 className="text-sm font-semibold text-[#0FACAC]">{governor.role}</h4>
                    </div>
                    <p className="text-xs w-[90%]">{governor.description}</p>
                    <div className="flex gap-4">
                      <a href={governor.facebook}><Image src="/facebook.svg" width={20} height={20} alt="Facebook Icon"/></a>
                      <a href={governor.github}><Image src="/github.svg" width={20} height={20} alt="Github Icon"/></a>
                      <a href={governor.linkedin}><Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn Icon"/></a>
                    </div>
                  </div>
                </div>
              )
              )}
            </div>
          </section>

          <section className="flex flex-col gap-20 items-center w-[100%]">
           <div className="w-full flex flex-col gap-8 items-center">
              <h2 className="text-3xl font-bold text-[#2F327D]">Club <span className="text-[#0FACAC]">Activities</span></h2>
              <p className="w-1/2 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div className="grid grid-cols-3 gap-15 w-[80%]">
              {activities.map(activity => (
                <div key={activity.title} className="text-center rounded-xl shadow-lg relative flex flex-col gap-5 px-8 py-4">
                  <Image className="absolute -top-[20%] left-[32.5%]" src={activity.picture} width={100} height={100} alt={activity.title + " icon"}/>
                  <h4 className="mt-10 text-xl text-[#2F327D] font-semibold">{activity.title}</h4>
                  <p className="text-sm">{activity.paragraph}</p>
                </div>
              ))
              }
            </div>
          </section>

          <section className="w-full flex justify-center items-center">
            <div className="relative w-[90%]">
              <Image src="/subscribe.svg" height={234.135} width={1016.67} alt="Newsletter sign-up background" className="w-full"/>
              <div className="absolute top-[30%] left-[20%] m-auto flex gap-20 items-start w-[60%] h-full">
                  <div className="w-2/3 flex flex-col gap-10 items-start">
                    <p className="text-[#2F327D] text-3xl font-bold ">Interested in <span className="text-[#0FACAC]">Hardware?</span> The Hardware Club is Available for you. Check it out.</p>
                    <div className="text-white  bg-[#166D86] px-6 py-2 rounded-3xl"><Link href="/hardware">Hardware Club</Link></div>
                  </div>
                  <div>
                    <Image src="/board.svg" width={174.31} height={227.61} alt=""/>
                  </div>
                </div>
              </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#1A4B5C] text-white py-12 rounded-t-3xl w-[90%] mx-auto">
          <div className="container mx-auto px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* ACES Uniben Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[50px] h-[50px] bg-white rounded-[50%] flex items-center justify-center">
                    <Image src="/logo.png" width={50} height={50} className="rounded-[50%]" alt="Aces logo graphical representation"/>
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
  )}
