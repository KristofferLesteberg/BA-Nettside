'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

const navLinks = [
  { href: '/products',        label: 'Våre Produkter' },
  { href: '/request-project', label: 'Prosjekter'     },
  { href: '/contact',         label: 'Kontakt Oss'    },
  { href: '/admin',           label: 'For lærere'          },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  let lastScrollY = 0;

  const scrollHeader = () => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY < lastScrollY || currentScrollY < 20);
    lastScrollY = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    }
  }, [])

  return (
    <header className={`w-full bg-subtle border-b border-border mb-10 fixed top-0 left-0 right-0 z-50
    transition-transform duration-300
    ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="shrink-0 relative h-18 w-48" onClick={() => setOpen(false)}>
          <Image
            src="/icons/SamEyde_vgs_rgb.svg"
            alt="Sam Eyde VGS"
            fill
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition-colors duration-150 ${
                pathname === href
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-text hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-xl text-text hover:bg-surface-raised transition-colors duration-150"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={open}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-border bg-subtle px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                pathname === href
                  ? 'bg-surface-raised text-primary'
                  : 'text-text hover:bg-surface-raised'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}