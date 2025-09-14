import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A4B5C] text-white py-12 rounded-t-3xl w-full md:w-[90%] mx-auto">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* ACES Uniben Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[50px] h-[50px] bg-white rounded-[50%] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  width={50}
                  height={50}
                  className="rounded-[50%]"
                  alt="Aces logo graphical representation"
                />
              </div>
              <h3 className="text-xl font-bold">ACES UNIBEN</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Copyright © {new Date().getFullYear()} ACES UNIBEN
              <br />
              All rights reserved
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <a href="https://www.linkedin.com/company/aces-uniben-chapter/"><Image src="/linkedIn-icon.svg" width={50} height={50} alt=""/></a>
              </div>
              <div className="w-8 h-8  rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <a href="https://x.com/acesuniben?t=dJ_iZ82TGagkbnwWfTi-0w&s=09"><Image src="/twitter-icon.svg" width={50} height={50} alt=""/></a>
              </div>
              <div className="w-8 h-8  rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <a href="https://www.instagram.com/aces_uniben23?igsh=bWIycGkzbHp4OGVj"><Image src="/instagram.svg" width={50} height={50} alt=""/></a>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed text-left">
              Next-Wave Executives
            </p>
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
                        href="/department"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Department
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
                        href="https://mhs.acesuniben.org"
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
                    <a
                        href="https://drive.google.com/drive/folders/1lOYE5bFrw7srXhODcYV8siD25I0GPSJA?usp=sharing"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Past Questions
                    </a>
                    </li>
                    <li>
                    <Link
                        href="/timetable"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Timetable
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/dues"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Dues
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="https://download.acesuniben.org"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Download
                    </Link>
                    </li>
                </ul>
                </div>

                {/* Contact Us Section */}
                <div>
                <h3 className="text-lg font-semibold mb-6">Contact us</h3>
                <div className="space-y-4 text-sm">
                    <div>
                    <p className="text-gray-300"><a href="mailto:acesuniben24@gmail.com">Email : acesuniben24@gmail.com</a></p>
                    </div>
                    <div>
                    <p className="text-gray-300"><a href="tel:08134408004">Phone no : 08134408004</a></p>
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
    )
}
