"use client";

import { Calculator, FileText, Rocket, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Calculator,
    title: "Mortgage Calculators",
    description: "Calculate your mortgage payment, affordability & more",
    href: "/mortgage-calculators",
    cta: "Calculate Now",
    gradient: "from-primary to-primary-dark",
    accent: "bg-primary-light/20",
  },
  {
    icon: FileText,
    title: "Loan Programs",
    description: "Find out which loan program is right for you",
    href: "/loan-programs",
    cta: "Explore Programs",
    gradient: "from-secondary-dark to-secondary",
    accent: "bg-secondary/20",
  },
  {
    icon: Rocket,
    title: "Apply Now",
    description: "Get pre-approved in minutes with our quick & easy app",
    href: COMPANY.applyUrl,
    cta: "Get Started",
    gradient: "from-primary-darker to-primary",
    accent: "bg-primary/20",
  },
];

export function CTACards() {
  return (
    <section className="py-16 -mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group block"
            >
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full">
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${card.gradient}`} />

                <div className="p-8 text-center">
                  <div className={`w-16 h-16 ${card.accent} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">{card.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
