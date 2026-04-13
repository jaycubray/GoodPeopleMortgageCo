"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-purchase.jpg"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary-darker/80" />

      <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest text-secondary mb-4 font-medium">Ready to begin?</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Get Started with Your<br />Digital Mortgage
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Answer a few quick questions. No hassle. No obligation. Our team will guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/apply-now" variant="secondary" size="lg">
              Get Started
            </Button>
            <Button href="/contact-us" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
              Talk to an Expert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
