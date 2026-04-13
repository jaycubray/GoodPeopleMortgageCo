"use client";

import { useEffect, useState } from "react";
import { Phone, FileText } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop floating button */}
      <div
        className={cn(
          "hidden md:block fixed bottom-8 right-8 z-40 transition-all duration-300",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <a
          href={COMPANY.applyUrl}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-primary-darker font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FileText className="h-5 w-5" />
          Get Pre-Approved
        </a>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg transition-transform duration-300",
          visible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold text-sm"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href={COMPANY.applyUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-secondary text-primary-darker font-semibold text-sm"
          >
            <FileText className="h-4 w-4" />
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
}
