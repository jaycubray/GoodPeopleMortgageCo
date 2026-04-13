"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { COMPANY } from "@/lib/constants";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exitIntentShown", "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay adding the listener to avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">We&apos;ll send your free rate quote shortly.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 text-center">
              Wait! Get Your Free Rate Quote
            </h3>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Before you go, let us send you a personalized rate quote. No obligation.
            </p>
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    firstName: data.get("firstName"),
                    lastName: data.get("lastName") || "N/A",
                    email: data.get("email"),
                    phone: data.get("phone"),
                    source: "exit-intent",
                  }),
                });
                setSubmitted(true);
              }}
            >
              <Input name="firstName" placeholder="Your Name" required id="exitName" />
              <Input name="email" type="email" placeholder="Email Address" required id="exitEmail" />
              <Input name="phone" type="tel" placeholder="Phone Number" required id="exitPhone" />
              <Button type="submit" className="w-full">
                Get My Free Quote
              </Button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-3">
              Or{" "}
              <a href={COMPANY.applyUrl} className="text-primary underline">
                apply now
              </a>{" "}
              to get pre-approved in minutes.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
