"use client";

import { Calculator, FileText, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Calculator,
    title: "Mortgage Calculators",
    description: "Calculate your mortgage payment, affordability & more",
    href: "/mortgage-calculators",
    cta: "Calculate Now",
  },
  {
    icon: FileText,
    title: "Loan Programs",
    description: "Find out which loan program is right for you",
    href: "/loan-programs",
    cta: "Explore Programs",
  },
  {
    icon: Rocket,
    title: "Apply Now",
    description: "Get pre-approved in minutes with our quick & easy app",
    href: COMPANY.applyUrl,
    cta: "Get Started",
  },
];

export function CTACards() {
  return (
    <section className="py-16 -mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="text-center h-full">
                <CardContent className="flex flex-col items-center py-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <card.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                  <Button href={card.href} variant="outline" size="sm">
                    {card.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
