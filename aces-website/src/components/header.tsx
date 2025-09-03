'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
    const pathname = usePathname();
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Department', href: '/department' },
        { name: 'Hardware Club', href: '/hardware' },
        { name: 'Software Club', href: '/software' },
        { name: 'MHS', href: '/mhs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
    ]

    return (
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
      )
}
