"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-darker to-primary text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Get Started with Your Digital Mortgage
          </h2>
          <p className="text-lg text-primary-lighter mb-8">
            Answer a few quick questions. No hassle. No obligation.
          </p>
          <Button href="/apply-now" variant="secondary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
