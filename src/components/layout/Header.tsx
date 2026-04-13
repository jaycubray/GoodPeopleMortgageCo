"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown, User } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Button } from "@/components/ui/Button";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 hover:text-secondary-light transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <div className="flex items-center gap-4">
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-secondary-light transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-secondary-light transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <Link
              href="/loan-officer"
              className="hidden sm:flex items-center gap-1 hover:text-secondary-light transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              Loan Officers
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={cn(
          "bg-white/95 backdrop-blur-md border-b transition-shadow duration-300",
          scrolled && "shadow-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="shrink-0">
            <Image
              src={COMPANY.logo}
              alt={COMPANY.name}
              width={180}
              height={82}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              ("children" in link) ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-nav-text hover:text-primary transition-colors cursor-pointer">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl border py-2 min-w-[200px] animate-scale-in">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-nav-text hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:block">
            <Button href={COMPANY.applyUrl} size="sm">
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[6.5rem] z-40 bg-white overflow-y-auto animate-slide-down">
          <div className="p-4 space-y-1">
            {NAV_LINKS.map((link) =>
              ("children" in link) ? (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-nav-text cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-nav-text hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 px-4">
              <Button href={COMPANY.applyUrl} className="w-full">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
