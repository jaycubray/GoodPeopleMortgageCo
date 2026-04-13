"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { TypedText } from "@/components/ui/TypedText";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";

const heroPhrases = [
  "Home Ownership",
  "Lower Payments",
  "Financial Freedom",
  "Your Perfect Home",
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax-style layering */}
      <Image
        src="/images/hero-home.jpg"
        alt="Beautiful family home"
        fill
        className="object-cover scale-110"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-darker/80 via-primary-darker/60 to-primary-darker/90" />

      {/* Animated decorative blurs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/15 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src={COMPANY.logo}
            alt={COMPANY.name}
            width={280}
            height={128}
            className="mx-auto h-20 md:h-24 w-auto brightness-0 invert"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6"
        >
          Realize Your Dreams of{" "}
          <br className="hidden md:block" />
          <TypedText phrases={heroPhrases} className="text-secondary" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          We are home loan experts dedicated to making sure your home purchase or
          refinance experience is top-notch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contact-us" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
            Contact Us
          </Button>
          <Button href={COMPANY.applyUrl} variant="secondary" size="lg">
            Apply Today
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
