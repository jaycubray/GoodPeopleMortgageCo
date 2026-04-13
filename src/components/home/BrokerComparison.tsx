"use client";

import { Section } from "@/components/ui/Section";
import { CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";

const rows = [
  { feature: "Shops multiple lenders for best rate", broker: true, bank: false },
  { feature: "Access to 50+ loan programs", broker: true, bank: false },
  { feature: "Personalized one-on-one guidance", broker: true, bank: false },
  { feature: "Works for YOU, not the lender", broker: true, bank: false },
  { feature: "Often lower closing costs", broker: true, bank: false },
  { feature: "Niche programs (Homes for Heroes, etc.)", broker: true, bank: false },
  { feature: "Can negotiate on your behalf", broker: true, bank: false },
  { feature: "Physical branch locations", broker: false, bank: true },
];

function Check() {
  return <CheckCircle className="h-5 w-5 text-primary mx-auto" />;
}
function No() {
  return <X className="h-5 w-5 text-gray-300 mx-auto" />;
}

export function BrokerComparison() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          Why Choose a Mortgage Broker?
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Unlike big banks that only offer their own products, we shop dozens of lenders to find you the best deal.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] bg-gray-50 border-b border-gray-200">
            <div className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Feature</div>
            <div className="p-4 text-center">
              <span className="text-sm font-bold text-primary">Us</span>
              <p className="text-[10px] text-gray-400">Broker</p>
            </div>
            <div className="p-4 text-center">
              <span className="text-sm font-bold text-gray-400">Bank</span>
              <p className="text-[10px] text-gray-400">Big Box</p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] items-center ${
                i < rows.length - 1 ? "border-b border-gray-100" : ""
              } ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <div className="p-4 text-sm text-gray-700">{row.feature}</div>
              <div className="p-4">{row.broker ? <Check /> : <No />}</div>
              <div className="p-4">{row.bank ? <Check /> : <No />}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
