"use client";

import Image from "next/image";
import { Shield, Award, Users, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Families Served", color: "from-primary to-primary-dark" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience", color: "from-secondary to-secondary-dark" },
  { icon: Star, value: 5, suffix: ".0", label: "Average Rating", color: "from-primary-light to-primary" },
];

export function TrustBar() {
  return (
    <section className="relative py-16 bg-white">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm uppercase tracking-widest text-gray-400 font-medium mb-10"
        >
          Trusted by hundreds of Florida families
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-semibold text-gray-900">NMLS</p>
            <p className="text-xs text-gray-500">2409276</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <Image
              src="/images/eoh-logo.svg"
              alt="Equal Housing Lender"
              width={48}
              height={48}
              className="h-12 w-12 mb-3"
            />
            <p className="text-xs text-gray-500">Equal Housing Lender</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
