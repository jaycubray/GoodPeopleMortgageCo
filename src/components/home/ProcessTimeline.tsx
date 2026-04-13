"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Settings, Search, CheckCircle, FileCheck, KeyRound } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, title: "Pre-Qualify", description: "Quick assessment of your budget" },
  { icon: FileText, title: "Apply", description: "Complete your application online" },
  { icon: Settings, title: "Processing", description: "We handle the paperwork" },
  { icon: Search, title: "Underwriting", description: "Final review of your file" },
  { icon: CheckCircle, title: "Approved", description: "Conditions cleared" },
  { icon: FileCheck, title: "Clear to Close", description: "Documents prepared" },
  { icon: KeyRound, title: "Closing", description: "Get your keys!" },
];

export function ProcessTimeline() {
  return (
    <Section variant="light">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          From pre-qualification to closing day — we make the mortgage process simple.
        </p>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <div className="absolute top-10 left-[7%] right-[7%] h-0.5 bg-gray-200" />
        <motion.div
          className="absolute top-10 left-[7%] h-0.5 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ width: "86%" }}
        />

        <div className="grid grid-cols-7 gap-2">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-20 h-20 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-4 shadow-md">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden relative pl-10">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20" />
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-4"
            >
              <div className="absolute -left-10 top-0 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center z-10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
