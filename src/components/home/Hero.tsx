"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-home.jpg"
        alt="Beautiful family home"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-primary-darker/70" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          <span className="text-secondary">Home Ownership</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10"
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
    </section>
  );
}
