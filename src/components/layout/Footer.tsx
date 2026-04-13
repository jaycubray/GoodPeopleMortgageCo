import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-primary-lighter text-sm leading-relaxed mb-4">
              We&apos;ve been helping customers afford the home of their dreams for many years and we love what we do.
            </p>
            <p className="text-sm text-primary-lighter">
              NMLS: {COMPANY.nmls}
            </p>
            <a
              href={COMPANY.nmlsConsumerAccess}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-secondary-light transition-colors"
            >
              NMLS Consumer Access
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-lighter">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {COMPANY.address}
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimers */}
          <div>
            <h3 className="text-lg font-bold mb-4">Disclaimers</h3>
            <ul className="space-y-2 text-sm text-primary-lighter">
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement" className="hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-lighter">
              <li>
                <Link href="/loan-programs" className="hover:text-white transition-colors">
                  Loan Programs
                </Link>
              </li>
              <li>
                <Link href="/loan-process" className="hover:text-white transition-colors">
                  Loan Process
                </Link>
              </li>
              <li>
                <Link href="/mortgage-basics" className="hover:text-white transition-colors">
                  Mortgage Basics
                </Link>
              </li>
              <li>
                <Link href="/online-forms" className="hover:text-white transition-colors">
                  Online Forms
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-darker border-t border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/eoh-logo.svg"
              alt="Equal Housing Lender"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xs text-primary-lighter">Equal Housing Lender</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-lighter hover:text-white transition-colors"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-lighter hover:text-white transition-colors"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-primary-lighter">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-xs text-primary-light/50">
            Built by{" "}
            <a href="https://jacobramos.com" target="_blank" rel="noopener noreferrer" className="text-primary-light/70 hover:text-white transition-colors">
              Jacob Ramos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
