'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Hardware Club', href: '/hardware' },
        { name: 'Software Club', href: '/software' },
        { name: 'MHS', href: '/mhs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
            <div>
                <Image src="/logo.png" alt="ACES Logo" width={60} height={60} />
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:block w-2/3">
                <ul className="flex justify-evenly">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'text-sm font-medium transition-colors duration-200',
                                    pathname === link.href ? 'text-[#166D86]' : 'text-black hover:text-[#166D86]'
                                )}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Hamburger Icon */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                aria-label="Open menu"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className="block w-8 h-1 rounded bg-[#166D86] mb-2"></span>
                <span className="block w-8 h-1 rounded bg-[#166D86] mb-2"></span>
                <span className="block w-8 h-1 rounded bg-[#166D86]"></span>
            </button>
            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden">
                    <ul className="flex flex-col items-center py-4">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        'text-sm font-medium transition-colors duration-200 py-2 px-4',
                                        pathname === link.href ? 'text-[#166D86] bg-gray-100' : 'text-black hover:text-[#166D86]'
                                    )}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}
