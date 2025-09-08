'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react"; // Only keep if used below

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Department', href: '/department' },
        { name: 'Hardware Club', href: '/hardware' },
        { name: 'Software Club', href: '/software' },
        { name: 'MHS', href: '/mhs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <header
            className={clsx(
                "w-full flex justify-between items-center px-6 py-4 shadow-md relative transition-colors duration-300",
                menuOpen ? "bg-[#166D86] md:bg-white" : "bg-white"
            )}
        >
            <div>
                <Image className="rounded-[50%] md:rounded-none" src="/logo.png" alt="ACES Logo" width={60} height={60} />
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:block w-full md:w-2/3">
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
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? (
                    // X icon
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute w-8 h-1 bg-white rounded rotate-45"></div>
                        <div className="absolute w-8 h-1 bg-white rounded -rotate-45"></div>
                    </div>
                ) : (
                    // Hamburger icon
                    <div className="flex flex-col gap-2">
                        <div className="block w-8 h-1 rounded bg-[#166D86]"></div>
                        <div className="block w-8 h-1 rounded bg-[#166D86]"></div>
                        <div className="block w-8 h-1 rounded bg-[#166D86]"></div>
                    </div>
                )}
            </button>
            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden">
                    <ul className="w-full flex flex-col items-center gap-3 py-4 pb-6 px-6">
                        {links.map((link) => (
                            <li className="w-full border-b-1 border-[#C3C2C2] p-2" key={link.href}>
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        'text-lg w-full font-medium py-2 px-4',
                                        pathname === link.href ? 'text-[#166D86]' : 'text-black hover:text-[#166D86]'
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
    );
}
