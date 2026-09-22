import { Link, Outlet, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Layout() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-sb-yellow selection:text-black flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo className="h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-[80px] md:w-[80px] p-0 my-1 ml-0 mr-2" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className={`font-semibold transition-colors hover:text-sb-blue ${pathname === '/' ? 'text-sb-blue' : 'text-black'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-semibold transition-colors hover:text-sb-blue ${pathname === '/about' ? 'text-sb-blue' : 'text-black'}`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`font-semibold transition-colors hover:text-sb-blue ${pathname === '/contact' ? 'text-sb-blue' : 'text-black'}`}
            >
              Contact Us
            </Link>
            <a
              href="https://forms.gle/p925jRAuBKBpQZ5o7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-sb-blue px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Own a franchise
            </a>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <a
              href="https://forms.gle/p925jRAuBKBpQZ5o7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-sb-blue px-3.5 py-1.5 text-xs font-bold text-white shadow-sm"
            >
              Own a franchise
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-sb-blue focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-5 shadow-lg md:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${pathname === '/' ? 'text-sb-blue' : 'text-black'}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${pathname === '/about' ? 'text-sb-blue' : 'text-black'}`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${pathname === '/contact' ? 'text-sb-blue' : 'text-black'}`}
              >
                Contact Us
              </Link>
              <a
                href="https://forms.gle/p925jRAuBKBpQZ5o7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 block w-full bg-sb-blue py-3 text-center text-sm font-bold text-white shadow-sm"
              >
                Own a franchise
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-sb-yellow pt-16 pb-12 text-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand column */}
            <div>
              <div className="mb-5 flex items-center">
                <Logo variant="bw" className="h-[90px] w-[90px]" />
              </div>
              <p className="mb-6 text-lg font-bold text-black">
                Stationery. Gifts. Everyday value.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center bg-black text-white transition-colors hover:bg-sb-blue hover:text-white"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center bg-black text-white transition-colors hover:bg-sb-blue hover:text-white"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center bg-black text-white transition-colors hover:bg-sb-blue hover:text-white"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-base font-extrabold uppercase tracking-wider text-black">Quick links</h4>
              <ul className="space-y-3 font-semibold text-gray-900">
                <li><Link to="/" className="hover:text-sb-blue transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-sb-blue transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-sb-blue transition-colors">Contact Us</Link></li>
                <li>
                  <a
                    href="https://forms.gle/p925jRAuBKBpQZ5o7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sb-blue transition-colors"
                  >
                    Franchise Enquiry
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="lg:col-span-2">
              <h4 className="mb-6 text-base font-extrabold uppercase tracking-wider text-black">Contact</h4>
              <ul className="space-y-4 font-semibold text-gray-900">
                <li className="flex items-start gap-3">
                  <Mail size={20} className="shrink-0 text-black mt-0.5" />
                  <span>
                    <a href="mailto:franchise@sbgo.in" className="text-black hover:text-sb-blue hover:underline">
                      franchise@sbgo.in
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={20} className="shrink-0 text-black mt-0.5" />
                  <span>
                    <a href="tel:+919328890356" className="text-black hover:text-sb-blue hover:underline">
                      +91 93288 90356
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 text-black mt-0.5" />
                  <span>SF-22, Abhishree Complex, Opp. Star Bazaar, Satellite, Ahmedabad, Gujarat 380015</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-black/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-800">
            <p>&copy; 2026 SB GO. All Rights Reserved.</p>
            <p className="text-gray-800">Stationery · Gifts · Everyday value</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
