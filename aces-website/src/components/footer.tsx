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
                <a
                  href="https://mhs.acesuniben.org"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  MHS
                </a>
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
                <a
                  href="https://mhs.acesuniben.org"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  MHS
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-300">
                  Email: acesuniben2425@gmail.com
                </p>
              </div>
              <div>
                <p className="text-gray-300">Phone No: 08134408004</p>
              </div>
              <div>
                <p className="text-gray-300">Address: ACES Secretariat,</p>
                <p className="text-gray-300">Faculty of Engineering, UNIBEn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
