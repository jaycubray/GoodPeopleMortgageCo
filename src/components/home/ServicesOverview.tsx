"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const purchasePrograms = ["FHA", "VA", "USDA", "Jumbo", "Conventional"];
const refinancePrograms = [
  "FHA Streamline", "FHA Cash Out", "FHA 203k",
  "VA Streamline", "VA Cash Out",
  "USDA Streamline",
  "Conventional", "Jumbo",
];
const nichePrograms = [
  "Home Possible", "Home Ready", "Homes for Heroes",
  "First Time Homebuyer", "HELOC",
];

export function ServicesOverview() {
  return (
    <Section variant="light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          Mortgage Solutions for Every Need
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you&apos;re buying your first home, upgrading, or refinancing, we have the right
          loan program for you in Saint Petersburg, FL and beyond.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-serif font-bold text-primary mb-4">
            Purchase Programs
          </h3>
          <div className="flex flex-wrap gap-2">
            {purchasePrograms.map((p) => (
              <Badge key={p} variant="primary">{p}</Badge>
            ))}
          </div>
          <Link
            href="/home-purchase"
            className="inline-block mt-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Learn more &rarr;
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-serif font-bold text-primary mb-4">
            Refinance Programs
          </h3>
          <div className="flex flex-wrap gap-2">
            {refinancePrograms.map((p) => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
          <Link
            href="/home-refinance"
            className="inline-block mt-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Learn more &rarr;
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-serif font-bold text-primary mb-4">
            Specialty Programs
          </h3>
          <div className="flex flex-wrap gap-2">
            {nichePrograms.map((p) => (
              <Badge key={p} variant="outline">{p}</Badge>
            ))}
          </div>
          <Link
            href="/loan-programs"
            className="inline-block mt-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            See all programs &rarr;
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
